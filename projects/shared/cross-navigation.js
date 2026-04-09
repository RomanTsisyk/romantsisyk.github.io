// Cross-Project Navigation System
(function() {
    'use strict';

    // Project Configuration
    const projects = [
        {
            name: 'Головна',
            path: '/index.html',
            icon: '🏠',
            description: 'Повернутися на головну'
        },
        {
            name: 'HP Poly Lens',
            path: '/projects/poly-lens/index.html',
            icon: '🎧',
            description: 'Enterprise Headset Management'
        },
        {
            name: 'Kasa Stefczyka',
            path: '/projects/kasa-stefczyka/index.html',
            icon: '💳',
            description: 'Banking Application'
        },
        {
            name: 'Earnly',
            path: '/projects/earnly/index.html',
            icon: '💰',
            description: 'Financial Management'
        },
        {
            name: 'FollowMyMoney',
            path: '/projects/followmymoney/index.html',
            icon: '📊',
            description: 'Expense Tracking'
        },
        {
            name: 'Job Recruiter',
            path: '/projects/job-recruiter/index.html',
            icon: '🏢',
            description: 'Smart Recruitment Platform'
        },
        {
            name: 'Mercedes Adapter',
            path: '/projects/mercedes-adapter/index.html',
            icon: '🔌',
            description: 'Integration Platform'
        },
        {
            name: 'Netti',
            path: '/projects/netti/index.html',
            icon: '📱',
            description: 'App Portfolio Demo'
        }
    ];

    // Create Navigation HTML
    function createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'cross-nav-container';
        nav.innerHTML = `
            <div class="cross-nav">
                <button class="cross-nav-home" title="Головна сторінка">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0