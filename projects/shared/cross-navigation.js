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
            path: '/poly lens portfolio/index.html',
            icon: '🎧',
            description: 'Enterprise Headset Management'
        },
        {
            name: 'Kasa Stefczyka',
            path: '/portfolio kasa stefczyka/index.html',
            icon: '💳',
            description: 'Banking Application'
        },
        {
            name: 'Earnly',
            path: '/earnly portfolio/index.html',
            icon: '💰',
            description: 'Financial Management'
        },
        {
            name: 'FollowMyMoney',
            path: '/followmymoney-portfolio/index.html',
            icon: '📊',
            description: 'Expense Tracking'
        },
        {
            name: 'Fels',
            path: '/portfolio fels/index.html',
            icon: '🏢',
            description: 'Business Solutions'
        },
        {
            name: 'Adapter',
            path: '/portfolio adapter/index.html',
            icon: '🔌',
            description: 'Integration Platform'
        },
        {
            name: 'Netti Demo',
            path: '/netti portfolio-demo/index.html',
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