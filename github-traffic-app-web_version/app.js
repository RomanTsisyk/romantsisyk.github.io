// Set global axios defaults
axios.defaults.timeout = 10000; // 10 seconds

document.addEventListener('DOMContentLoaded', () => {
    console.log('GitHub Traffic Dashboard Web App Initialized');

    // Initialize UI elements
    initializeUI();

    // Check if user is already logged in (token in localStorage)
    checkLoginState();
});

// --- UI Helper Functions --- //
function showLoading(message = 'Loading...') {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = message;
    loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('hidden');
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    console.error('Error:', message);
}

function showLoginScreen() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('dashboardScreen').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.remove('hidden');
    document.getElementById('dashboardContent').classList.remove('hidden');
}

function clearCharts() {
    // Destroy existing charts to prevent memory leaks
    if (window.viewsChart) {
        window.viewsChart.destroy();
        window.viewsChart = null;
    }
    if (window.overallViewsChart) {
        window.overallViewsChart.destroy();
        window.overallViewsChart = null;
    }
    if (window.clonesChart) {
        window.clonesChart.destroy();
        window.clonesChart = null;
    }
    if (window.overallClonesChart) {
        window.overallClonesChart.destroy();
        window.overallClonesChart = null;
    }
}

// Reset zoom on any chart
window.resetZoom = function(chartId) {
    console.log('Resetting zoom for chart:', chartId);
    const chart = Chart.getChart(chartId);
    if (chart) {
        chart.resetZoom();
    } else {
        console.error('Chart not found:', chartId);
    }
};

// --- UI Initialization --- //
function initializeUI() {
    // Login screen elements
    const loginButton = document.getElementById('loginButton');
    const tokenInput = document.getElementById('tokenInput');

    // Dashboard elements
    const logoutButton = document.getElementById('logoutButton');

    // Add event listeners
    loginButton.addEventListener('click', handleLogin);
    logoutButton.addEventListener('click', handleLogout);
    
    // Allow pressing Enter to login
    tokenInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            loginButton.click();
        }
    });
    
    // Clear error on input change
    tokenInput.addEventListener('input', () => {
        document.getElementById('errorMessage').classList.add('hidden');
    });
    
    console.log('UI elements initialized');
}

// Check if the user is already logged in
function checkLoginState() {
    const token = sessionStorage.getItem('github_token');
    const userData = localStorage.getItem('github_user');
    
    if (token && userData) {
        try {
            const user = JSON.parse(userData);
            console.log('User already logged in:', user.login);
            document.getElementById('username').textContent = user.login;
            showDashboard();
            fetchRepositoryData(token, user.login);
        } catch (error) {
            console.error('Error parsing user data:', error);
            handleLogout();
        }
    } else {
        console.log('User not logged in');
    }
}

// --- Login/Logout Handling --- //
async function handleLogin() {
    const tokenInput = document.getElementById('tokenInput');
    const token = tokenInput.value.trim();
    
    if (!validateToken(token)) {
        return;
    }
    
    showLoading('Connecting to GitHub...');
    
    try {
        // Validate token by fetching user data
        const user = await fetchUserData(token);
        
        if (user) {
            // Store token and user data
            sessionStorage.setItem('github_token', token);
            localStorage.setItem('github_user', JSON.stringify(user));
            
            // Update UI
            document.getElementById('username').textContent = user.login;
            
            // Navigate to dashboard
            showDashboard();
            
            // Fetch repository data
            fetchRepositoryData(token, user.login);
        } else {
            showError('Failed to authenticate with GitHub. Please check your token.');
            hideLoading();
        }
    } catch (error) {
        console.error('Login error:', error);
        showError(`Authentication failed: ${error.message}`);
        hideLoading();
    }
}

function handleLogout() {
    // Clear stored data
    sessionStorage.removeItem('github_token');
    localStorage.removeItem('github_user');
    
    // Clear any existing chart data
    clearCharts();
    
    // Navigate back to login
    showLoginScreen();
    
    console.log('User logged out');
}

function validateToken(token) {
    if (!token) {
        showError('Please enter your GitHub Personal Access Token');
        return false;
    }

    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
        showError('Invalid token format. GitHub Personal Access Tokens typically start with "ghp_" or "github_pat_"');
        return false;
    }
    
    return true;
}

// --- API Calls --- //
async function fetchUserData(token) {
    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        console.log('User data fetched successfully');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 403 && error.response?.headers?.['x-ratelimit-remaining'] === '0') {
            throw new Error('GitHub API rate limit exceeded. Please wait before trying again.');
        }
        throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
}

async function fetchRepositoryData(token, username) {
    showLoading('Fetching repository data...');

    try {
        // Fetch all repositories with pagination (handles > 100 repos)
        const authHeaders = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        };

        // Helper to check for rate limit on any response error
        function checkRateLimit(error) {
            if (error.response?.status === 403 && error.response?.headers?.['x-ratelimit-remaining'] === '0') {
                throw new Error('GitHub API rate limit exceeded. Please wait before trying again.');
            }
        }

        let page = 1;
        let allRepos = [];
        let hasMore = true;
        while (hasMore) {
            const reposResponse = await axios.get('https://api.github.com/user/repos', {
                headers: authHeaders,
                params: { per_page: 100, page }
            });
            allRepos = [...allRepos, ...reposResponse.data];
            hasMore = reposResponse.data.length === 100;
            page++;
        }

        const repos = allRepos;
        console.log(`Found ${repos.length} repositories`);

        if (repos.length === 0) {
            hideLoading();
            showError('No repositories found for this account.');
            return;
        }

        // Fetch traffic data for all repos in parallel
        showLoading(`Fetching traffic data for ${repos.length} repositories...`);

        async function fetchRepoTraffic(repo) {
            const [viewsResponse, clonesResponse] = await Promise.all([
                axios.get(
                    `https://api.github.com/repos/${username}/${repo.name}/traffic/views`,
                    { headers: authHeaders }
                ),
                axios.get(
                    `https://api.github.com/repos/${username}/${repo.name}/traffic/clones`,
                    { headers: authHeaders }
                )
            ]);
            return {
                name: repo.name,
                views: viewsResponse.data,
                clones: clonesResponse.data
            };
        }

        const results = await Promise.allSettled(
            repos.map(repo => fetchRepoTraffic(repo))
        );

        const repoData = [];
        results.forEach((result, i) => {
            if (result.status === 'fulfilled') {
                repoData.push(result.value);
            } else {
                console.error(`Error fetching data for ${repos[i].name}:`, result.reason);
            }
        });

        // Process data and create charts
        processRepositoryData({
            success: true,
            username,
            repos: repoData
        });

        // Hide loading and show dashboard content
        hideLoading();
    } catch (error) {
        console.error('Error fetching repository data:', error);
        hideLoading();
        if (error.response?.status === 403 && error.response?.headers?.['x-ratelimit-remaining'] === '0') {
            showError('GitHub API rate limit exceeded. Please wait before trying again.');
        } else {
            showError(`Failed to fetch repository data: ${error.message}`);
        }
    }
}

// --- Data Processing --- //
function processRepositoryData(data) {
    const { repos } = data;
    
    if (!repos || repos.length === 0) {
        showError('No repository data available.');
        return;
    }
    
    console.log(`Processing data for ${repos.length} repositories`);
    
    // Process Views Data
    const viewsByRepo = {};
    const viewsUniquesByRepo = {};
    const allViewDates = new Set();

    repos.forEach(repo => {
        if (repo.views && repo.views.views) {
            viewsByRepo[repo.name] = {};
            viewsUniquesByRepo[repo.name] = {};

            repo.views.views.forEach(view => {
                const date = view.timestamp.replace('T00:00:00Z', '');
                viewsByRepo[repo.name][date] = view.count;
                viewsUniquesByRepo[repo.name][date] = view.uniques;
                allViewDates.add(date);
            });
        }
    });

    // Process Clones Data
    const clonesByRepo = {};
    const clonesUniquesByRepo = {};
    const allCloneDates = new Set();

    repos.forEach(repo => {
        if (repo.clones && repo.clones.clones) {
            clonesByRepo[repo.name] = {};
            clonesUniquesByRepo[repo.name] = {};

            repo.clones.clones.forEach(clone => {
                const date = clone.timestamp.replace('T00:00:00Z', '');
                clonesByRepo[repo.name][date] = clone.count;
                clonesUniquesByRepo[repo.name][date] = clone.uniques;
                allCloneDates.add(date);
            });
        }
    });
    
    // Sort dates
    const sortedViewDates = Array.from(allViewDates).sort();
    const sortedCloneDates = Array.from(allCloneDates).sort();
    
    console.log(`Found ${sortedViewDates.length} view dates and ${sortedCloneDates.length} clone dates`);
    
    // Prepare chart data
    const viewsChartData = prepareChartData(viewsByRepo, sortedViewDates);
    const viewsUniquesChartData = prepareChartData(viewsUniquesByRepo, sortedViewDates);
    const clonesChartData = prepareChartData(clonesByRepo, sortedCloneDates);
    const clonesUniquesChartData = prepareChartData(clonesUniquesByRepo, sortedCloneDates);

    // Calculate overall data
    const overallViews = calculateOverallData(viewsByRepo, sortedViewDates);
    const overallViewsUniques = calculateOverallData(viewsUniquesByRepo, sortedViewDates);
    const overallClones = calculateOverallData(clonesByRepo, sortedCloneDates);
    const overallClonesUniques = calculateOverallData(clonesUniquesByRepo, sortedCloneDates);

    // Create the charts
    console.log('Creating charts...');
    createViewsChart(sortedViewDates, viewsChartData, viewsUniquesChartData);
    createOverallViewsChart(sortedViewDates, overallViews, overallViewsUniques);
    createClonesChart(sortedCloneDates, clonesChartData, clonesUniquesChartData);
    createOverallClonesChart(sortedCloneDates, overallClones, overallClonesUniques);
    console.log('Charts created');
}

// Prepare data for chart
function prepareChartData(dataByRepo, sortedDates) {
    const result = {};
    
    for (const repo in dataByRepo) {
        result[repo] = sortedDates.map(date => dataByRepo[repo][date] || 0);
    }
    
    return result;
}

// Calculate overall data by date
function calculateOverallData(dataByRepo, sortedDates) {
    return sortedDates.map(date => {
        let sum = 0;
        for (const repo in dataByRepo) {
            sum += dataByRepo[repo][date] || 0;
        }
        return sum;
    });
}

// --- Chart Creation --- //
// Colors for charts
const chartColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(201, 203, 207)',
    'rgb(0, 162, 235)',
    'rgb(255, 99, 71)',
    'rgb(46, 139, 87)'
];

// Default zoom options for all charts
const zoomOptions = {
    pan: {
        enabled: true,
        mode: 'xy',
        threshold: 10
    },
    zoom: {
        wheel: {
            enabled: true
        },
        pinch: {
            enabled: true
        },
        mode: 'xy',
        speed: 0.05
    },
    limits: {
        y: {min: 0}
    }
};


// Create views chart
function createViewsChart(labels, datasetsData, uniquesData) {
    try {
        const datasets = [];
        let colorIndex = 0;

        for (const repo in datasetsData) {
            datasets.push({
                label: repo,
                data: datasetsData[repo],
                borderColor: chartColors[colorIndex % chartColors.length],
                backgroundColor: chartColors[colorIndex % chartColors.length],
                fill: false,
                tension: 0.3,
                pointRadius: 4,
                uniquesData: uniquesData[repo] || []
            });
            colorIndex++;
        }

        const canvasEl = document.getElementById('viewsChart');
        const existingChart = Chart.getChart(canvasEl);
        if (existingChart) existingChart.destroy();
        const ctx = canvasEl.getContext('2d');
        window.viewsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Daily Views per Repository'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                const uniques = context.dataset.uniquesData ? context.dataset.uniquesData[context.dataIndex] : 0;
                                return `${context.dataset.label}: ${context.parsed.y} views (${uniques} unique)`;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20
                        }
                    },
                    zoom: zoomOptions
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Views'
                        }
                    }
                }
            }
        });
        console.log('Views chart created');
    } catch (error) {
        console.error('Error creating views chart:', error);
    }
}

// Create overall views chart
function createOverallViewsChart(labels, data, uniquesData) {
    try {
        const canvasEl = document.getElementById('overallViewsChart');
        const existingChart = Chart.getChart(canvasEl);
        if (existingChart) existingChart.destroy();
        const ctx = canvasEl.getContext('2d');
        window.overallViewsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Views',
                    data: data,
                    borderColor: 'rgb(0, 122, 204)',
                    backgroundColor: 'rgba(0, 122, 204, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgb(0, 122, 204)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Overall Daily Views'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const uniques = uniquesData ? uniquesData[context.dataIndex] : 0;
                                return `${context.parsed.y} views (${uniques} unique)`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    zoom: zoomOptions
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Views'
                        }
                    }
                }
            }
        });
        console.log('Overall views chart created');
    } catch (error) {
        console.error('Error creating overall views chart:', error);
    }
}

// Create clones chart
function createClonesChart(labels, datasetsData, uniquesData) {
    try {
        const datasets = [];
        let colorIndex = 0;

        for (const repo in datasetsData) {
            datasets.push({
                label: repo,
                data: datasetsData[repo],
                borderColor: chartColors[colorIndex % chartColors.length],
                backgroundColor: chartColors[colorIndex % chartColors.length],
                fill: false,
                tension: 0.3,
                pointRadius: 4,
                uniquesData: uniquesData[repo] || []
            });
            colorIndex++;
        }

        const canvasEl = document.getElementById('clonesChart');
        const existingChart = Chart.getChart(canvasEl);
        if (existingChart) existingChart.destroy();
        const ctx = canvasEl.getContext('2d');
        window.clonesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Daily Clones per Repository'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                const uniques = context.dataset.uniquesData ? context.dataset.uniquesData[context.dataIndex] : 0;
                                return `${context.dataset.label}: ${context.parsed.y} clones (${uniques} unique)`;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20
                        }
                    },
                    zoom: zoomOptions
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Clones'
                        }
                    }
                }
            }
        });
        console.log('Clones chart created');
    } catch (error) {
        console.error('Error creating clones chart:', error);
    }
}

// Create overall clones chart
function createOverallClonesChart(labels, data, uniquesData) {
    try {
        const canvasEl = document.getElementById('overallClonesChart');
        const existingChart = Chart.getChart(canvasEl);
        if (existingChart) existingChart.destroy();
        const ctx = canvasEl.getContext('2d');
        window.overallClonesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Clones',
                    data: data,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgb(75, 192, 192)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Overall Daily Clones'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const uniques = uniquesData ? uniquesData[context.dataIndex] : 0;
                                return `${context.parsed.y} clones (${uniques} unique)`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    zoom: zoomOptions
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Clones'
                        }
                    }
                }
            }
        });
        console.log('Overall clones chart created');
    } catch (error) {
        console.error('Error creating overall clones chart:', error);
    }
}
