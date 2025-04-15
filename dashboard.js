document.addEventListener('DOMContentLoaded', () => {
    // Mock API Data
    const mockApi = {
        profile: {
            name: 'Jane Doe',
            id: 'COOP12345',
            joined: '2020-01-15',
            avatar: 'default-avatar.png'
        },
        balance: {
            amount: 5230.45,
            status: 'Healthy'
        },
        transactions: [
            { date: '2025-04-10', type: 'deposit', amount: 1000, description: 'Monthly Contribution' },
            { date: '2025-04-08', type: 'withdrawal', amount: -200, description: 'Personal Use' },
            { date: '2025-04-05', type: 'loan', amount: -150, description: 'Loan #123 Repayment' },
            { date: '2025-04-02', type: 'deposit', amount: 500, description: 'Bonus Contribution' },
            { date: '2025-03-30', type: 'withdrawal', amount: -100, description: 'Fees' }
        ],
        loans: [
            { id: '123', amount: 2000, term: '12 Months', status: 'Pending', date: '2025-04-01', repaid: 0 },
            { id: '122', amount: 1500, term: '6 Months', status: 'Approved', date: '2025-03-15', repaid: 750 }
        ],
        notifications: [
            { id: 1, message: 'Loan #123 is pending approval.', timestamp: '2025-04-10 09:00', read: false },
            { id: 2, message: 'Your balance is below {symbol}6,000.', timestamp: '2025-04-09 15:30', read: false },
            { id: 3, message: 'Deposit of {symbol}1,000 confirmed.', timestamp: '2025-04-08 12:00', read: true }
        ],
        loanDetails: {
            '123': {
                id: '123',
                amount: 2000,
                term: '12 Months',
                status: 'Pending',
                date: '2025-04-01',
                repaid: 0,
                history: []
            },
            '122': {
                id: '122',
                amount: 1500,
                term: '6 Months',
                status: 'Approved',
                date: '2025-03-15',
                repaid: 750,
                history: [
                    { date: '2025-04-01', amount: 250 },
                    { date: '2025-03-01', amount: 500 }
                ]
            }
        },
        settings: {
            email: 'jane.doe@example.com',
            notificationsEnabled: true
        },
        savingsGoals: [],
        contribution: {
            target: 5000,
            current: 5000
        }
    };

    // Language Support
    const translations = {
        en: {
            'dashboard-title': 'Cooperator Dashboard',
            'language-label': 'Language:',
            'currency-label': 'Currency:',
            'notifications': '🔔 Notifications ({count})',
            'upload-btn': 'Change Picture',
            'edit-profile-btn': 'Edit Profile',
            'contribution-title': 'Monthly Contribution',
            'contribution-status': 'You’ve met your goal!',
            'balance-title': 'Account Balance',
            'balance-status': 'Healthy Balance',
            'deposit-btn': 'Deposit Funds',
            'support-btn': 'Contact Support',
            'quick-actions-title': 'Quick Actions',
            'action-loan': 'Request Loan',
            'action-savings': 'Set Savings Goal',
            'action-withdraw': 'Withdraw Funds',
            'calculator-title': 'Loan Calculator',
            'calc-amount-label': 'Loan Amount',
            'calc-rate-label': 'Interest Rate (%)',
            'term-6': '6 Months',
            'term-12': '12 Months',
            'term-24': '24 Months',
            'calculate-btn': 'Calculate',
            'calc-result': 'Estimated Payment: {symbol}86.67/month',
            'chart-title': 'Balance Trend',
            'transactions-title': 'Recent Transactions',
            'filter-all': 'All',
            'filter-deposit': 'Deposits',
            'filter-withdrawal': 'Withdrawals',
            'filter-loan': 'Loan Payments',
            'export-btn': 'Export as CSV',
            'table-date': 'Date',
            'table-type': 'Type',
            'table-amount': 'Amount',
            'table-desc': 'Description',
            'type-deposit': 'Deposit',
            'type-withdrawal': 'Withdrawal',
            'type-loan': 'Loan Payment',
            'desc-contribution': 'Monthly Contribution',
            'desc-personal': 'Personal Use',
            'desc-repayment': 'Loan #123 Repayment',
            'desc-bonus': 'Bonus Contribution',
            'desc-fees': 'Fees',
            'desc-deposit': 'Deposit',
            'prev-page': 'Previous',
            'next-page': 'Next',
            'page-info': 'Page {current} of {total}',
            'loan-form-title': 'Request a Loan',
            'loan-amount-label': 'Loan Amount',
            'select-term': 'Select Term',
            'loan-purpose-label': 'Purpose (Optional)',
            'submit-loan-btn': 'Submit Request',
            'loan-status-title': 'Loan Status',
            'loan-amount': 'Amount',
            'loan-status': 'Status',
            'status-pending': 'Pending',
            'status-approved': 'Approved',
            'progress-label': 'Repayment Progress',
            'details-btn': 'View Details',
            'savings-goal-title': 'Savings Goal Tracker',
            'savings-name-label': 'Goal Name',
            'savings-target-label': 'Target Amount',
            'savings-deadline-label': 'Deadline (Optional)',
            'set-goal-btn': 'Set Goal',
            'benefits-title': 'Member Benefits',
            'benefit-dividends': 'Annual Dividends',
            'benefit-dividends-desc': 'Earn dividends based on cooperative profits.',
            'benefit-community': 'Community Events',
            'benefit-community-desc': 'Join workshops and networking events.',
            'benefit-education': 'Financial Education',
            'benefit-education-desc': 'Access free financial literacy programs.',
            'settings-title': 'Settings',
            'email-label': 'Email Address',
            'notifications-label': 'Enable Notifications',
            'save-settings-btn': 'Save Settings',
            'deposit-modal-title': 'Deposit Funds',
            'deposit-amount-label': 'Amount',
            'deposit-submit-btn': 'Deposit',
            'modal-title': 'Loan Details',
            'modal-id': 'Loan ID',
            'modal-amount': 'Amount',
            'modal-term': 'Term',
            'modal-status': 'Status',
            'modal-date': 'Request Date',
            'modal-progress': 'Repayment Progress',
            'modal-history': 'Repayment History',
            'history-date': 'Date',
            'history-amount': 'Amount',
            'download-loan-btn': 'Download PDF',
            'mark-read': 'Mark as Read',
            'dark-mode-label': 'Dark Mode',
            'footer': '© 2025 Unity Cooperative. All rights reserved.',
            'notification-1': 'Loan #123 is pending approval.',
            'notification-2': 'Your balance is below {symbol}6,000.',
            'notification-3': 'Deposit of {symbol}1,000 confirmed.',
            'notification-savings-50': 'You’ve reached 50% of your savings goal "{name}"!',
            'notification-savings-100': 'Congratulations! You’ve achieved your savings goal "{name}"!'
        },
        es: {
            'dashboard-title': 'Panel de Cooperadores',
            'language-label': 'Idioma:',
            'currency-label': 'Moneda:',
            'notifications': '🔔 Notificaciones ({count})',
            'upload-btn': 'Cambiar Imagen',
            'edit-profile-btn': 'Editar Perfil',
            'contribution-title': 'Contribución Mensual',
            'contribution-status': '¡Has alcanzado tu meta!',
            'balance-title': 'Saldo de la Cuenta',
            'balance-status': 'Saldo Saludable',
            'deposit-btn': 'Depositar Fondos',
            'support-btn': 'Contactar Soporte',
            'quick-actions-title': 'Acciones Rápidas',
            'action-loan': 'Solicitar Préstamo',
            'action-savings': 'Establecer Meta de Ahorro',
            'action-withdraw': 'Retirar Fondos',
            'calculator-title': 'Calculadora de Préstamos',
            'calc-amount-label': 'Monto del Préstamo',
            'calc-rate-label': 'Tasa de Interés (%)',
            'term-6': '6 Meses',
            'term-12': '12 Meses',
            'term-24': '24 Meses',
            'calculate-btn': 'Calcular',
            'calc-result': 'Pago Estimado: {symbol}86.67/mes',
            'chart-title': 'Tendencia de Saldo',
            'transactions-title': 'Transacciones Recientes',
            'filter-all': 'Todas',
            'filter-deposit': 'Depósitos',
            'filter-withdrawal': 'Retiros',
            'filter-loan': 'Pagos de Préstamo',
            'export-btn': 'Exportar como CSV',
            'table-date': 'Fecha',
            'table-type': 'Tipo',
            'table-amount': 'Monto',
            'table-desc': 'Descripción',
            'type-deposit': 'Depósito',
            'type-withdrawal': 'Retiro',
            'type-loan': 'Pago de Préstamo',
            'desc-contribution': 'Contribución Mensual',
            'desc-personal': 'Uso Personal',
            'desc-repayment': 'Reembolso de Préstamo #123',
            'desc-bonus': 'Contribución Extra',
            'desc-fees': 'Tarifas',
            'desc-deposit': 'Depósito',
            'prev-page': 'Anterior',
            'next-page': 'Siguiente',
            'page-info': 'Página {current} de {total}',
            'loan-form-title': 'Solicitar un Préstamo',
            'loan-amount-label': 'Monto del Préstamo',
            'select-term': 'Seleccionar Plazo',
            'loan-purpose-label': 'Propósito (Opcional)',
            'submit-loan-btn': 'Enviar Solicitud',
            'loan-status-title': 'Estado de Préstamos',
            'loan-amount': 'Monto',
            'loan-status': 'Estado',
            'status-pending': 'Pendiente',
            'status-approved': 'Aprobado',
            'progress-label': 'Progreso de Reembolso',
            'details-btn': 'Ver Detalles',
            'savings-goal-title': 'Seguimiento de Metas de Ahorro',
            'savings-name-label': 'Nombre de la Meta',
            'savings-target-label': 'Monto Objetivo',
            'savings-deadline-label': 'Fecha Límite (Opcional)',
            'set-goal-btn': 'Establecer Meta',
            'benefits-title': 'Beneficios para Miembros',
            'benefit-dividends': 'Dividendos Anuales',
            'benefit-dividends-desc': 'Gana dividendos basados en las ganancias de la cooperativa.',
            'benefit-community': 'Eventos Comunitarios',
            'benefit-community-desc': 'Participa en talleres y eventos de networking.',
            'benefit-education': 'Educación Financiera',
            'benefit-education-desc': 'Accede a programas gratuitos de educación financiera.',
            'settings-title': 'Configuraciones',
            'email-label': 'Dirección de Correo',
            'notifications-label': 'Habilitar Notificaciones',
            'save-settings-btn': 'Guardar Configuraciones',
            'deposit-modal-title': 'Depositar Fondos',
            'deposit-amount-label': 'Monto',
            'deposit-submit-btn': 'Depositar',
            'modal-title': 'Detalles del Préstamo',
            'modal-id': 'ID del Préstamo',
            'modal-amount': 'Monto',
            'modal-term': 'Plazo',
            'modal-status': 'Estado',
            'modal-date': 'Fecha de Solicitud',
            'modal-progress': 'Progreso de Reembolso',
            'modal-history': 'Historial de Reembolsos',
            'history-date': 'Fecha',
            'history-amount': 'Monto',
            'download-loan-btn': 'Descargar PDF',
            'mark-read': 'Marcar como Leído',
            'dark-mode-label': 'Modo Oscuro',
            'footer': '© 2025 Cooperativa Unity. Todos los derechos reservados.',
            'notification-1': 'El préstamo #123 está pendiente de aprobación.',
            'notification-2': 'Su saldo está por debajo de {symbol}6,000.',
            'notification-3': 'Depósito de {symbol}1,000 confirmado.',
            'notification-savings-50': '¡Has alcanzado el 50% de tu meta de ahorro "{name}"!',
            'notification-savings-100': '¡Felicidades! ¡Has logrado tu meta de ahorro "{name}"!'
        },
        fr: {
            'dashboard-title': 'Tableau de Bord des Cooperateurs',
            'language-label': 'Langue :',
            'currency-label': 'Devise :',
            'notifications': '🔔 Notifications ({count})',
            'upload-btn': 'Changer la Photo',
            'edit-profile-btn': 'Modifier le Profil',
            'contribution-title': 'Contribution Mensuelle',
            'contribution-status': 'Vous avez atteint votre objectif !',
            'balance-title': 'Solde du Compte',
            'balance-status': 'Solde Sain',
            'deposit-btn': 'Déposer des Fonds',
            'support-btn': 'Contacter le Support',
            'quick-actions-title': 'Actions Rapides',
            'action-loan': 'Demander un Prêt',
            'action-savings': 'Définir un Objectif d’Épargne',
            'action-withdraw': 'Retirer des Fonds',
            'calculator-title': 'Calculatrice de Prêt',
            'calc-amount-label': 'Montant du Prêt',
            'calc-rate-label': 'Taux d\'Intérêt (%)',
            'term-6': '6 Mois',
            'term-12': '12 Mois',
            'term-24': '24 Mois',
            'calculate-btn': 'Calculer',
            'calc-result': 'Paiement Estimé : {symbol}86.67/mois',
            'chart-title': 'Tendance du Solde',
            'transactions-title': 'Transactions Récentes',
            'filter-all': 'Toutes',
            'filter-deposit': 'Dépôts',
            'filter-withdrawal': 'Retraits',
            'filter-loan': 'Paiements de Prêt',
            'export-btn': 'Exporter en CSV',
            'table-date': 'Date',
            'table-type': 'Type',
            'table-amount': 'Montant',
            'table-desc': 'Description',
            'type-deposit': 'Dépôt',
            'type-withdrawal': 'Retrait',
            'type-loan': 'Paiement de Prêt',
            'desc-contribution': 'Contribution Mensuelle',
            'desc-personal': 'Usage Personnel',
            'desc-repayment': 'Remboursement du Prêt #123',
            'desc-bonus': 'Contribution Bonus',
            'desc-fees': 'Frais',
            'desc-deposit': 'Dépôt',
            'prev-page': 'Précédent',
            'next-page': 'Suivant',
            'page-info': 'Page {current} de {total}',
            'loan-form-title': 'Demander un Prêt',
            'loan-amount-label': 'Montant du Prêt',
            'select-term': 'Sélectionner la Durée',
            'loan-purpose-label': 'Objectif (Facultatif)',
            'submit-loan-btn': 'Soumettre la Demande',
            'loan-status-title': 'Statut des Prêts',
            'loan-amount': 'Montant',
            'loan-status': 'Statut',
            'status-pending': 'En Attente',
            'status-approved': 'Approuvé',
            'progress-label': 'Progrès du Remboursement',
            'details-btn': 'Voir les Détails',
            'savings-goal-title': 'Suivi des Objectifs d’Épargne',
            'savings-name-label': 'Nom de l’Objectif',
            'savings-target-label': 'Montant Cible',
            'savings-deadline-label': 'Date Limite (Facultatif)',
            'set-goal-btn': 'Définir l’Objectif',
            'benefits-title': 'Avantages des Membres',
            'benefit-dividends': 'Dividendes Annuels',
            'benefit-dividends-desc': 'Gagnez des dividendes basés sur les profits de la coopérative.',
            'benefit-community': 'Événements Communautaires',
            'benefit-community-desc': 'Participez à des ateliers et des événements de réseautage.',
            'benefit-education': 'Éducation Financière',
            'benefit-education-desc': 'Accédez à des programmes gratuits d’éducation financière.',
            'settings-title': 'Paramètres',
            'email-label': 'Adresse E-mail',
            'notifications-label': 'Activer les Notifications',
            'save-settings-btn': 'Enregistrer les Paramètres',
            'deposit-modal-title': 'Déposer des Fonds',
            'deposit-amount-label': 'Montant',
            'deposit-submit-btn': 'Déposer',
            'modal-title': 'Détails du Prêt',
            'modal-id': 'ID du Prêt',
            'modal-amount': 'Montant',
            'modal-term': 'Durée',
            'modal-status': 'Statut',
            'modal-date': 'Date de Demande',
            'modal-progress': 'Progrès du Remboursement',
            'modal-history': 'Historique des Remboursements',
            'history-date': 'Date',
            'history-amount': 'Montant',
            'download-loan-btn': 'Télécharger PDF',
            'mark-read': 'Marquer comme Lu',
            'dark-mode-label': 'Mode Sombre',
            'footer': '© 2025 Coopérative Unity. Tous droits réservés.',
            'notification-1': 'Le prêt #123 est en attente d\'approbation.',
            'notification-2': 'Votre solde est inférieur à {symbol}6,000.',
            'notification-3': 'Dépôt de {symbol}1,000 confirmé.',
            'notification-savings-50': 'Vous avez atteint 50% de votre objectif d’épargne "{name}" !',
            'notification-savings-100': 'Félicitations ! Vous avez atteint votre objectif d’épargne "{name}" !'
        }
    };

    // Currency Formatter
    let currentCurrency = 'NGN';
    const currencySymbols = { NGN: '₦', USD: '$' };
    const currencyLocales = { NGN: 'en-NG', USD: 'en-US' };

    function formatCurrency(amount, currency) {
        return amount.toLocaleString(currencyLocales[currency], {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        });
    }

    // Language Switcher
    const languageSelect = document.getElementById('language-select');
    function updateLanguage(lang, currency = currentCurrency) {
        document.querySelectorAll('[data-lang-key]').forEach(elem => {
            const key = elem.getAttribute('data-lang-key');
            let text = translations[lang][key] || elem.textContent;
            text = text.replace('{symbol}', currencySymbols[currency]);
            if (key === 'page-info') {
                const [current, total] = document.getElementById('page-info').textContent.match(/\d+/g) || [1, 1];
                text = translations[lang][key].replace('{current}', current).replace('{total}', total);
            } else if (key === 'notifications') {
                const unreadCount = mockApi.notifications.filter(n => !n.read).length;
                text = translations[lang][key].replace('{count}', unreadCount);
            }
            elem.textContent = text;
        });
        updateDynamicElements(lang, currency);
    }

    function updateDynamicElements(lang, currency) {
        // Update Calculator Result
        const calcResult = document.getElementById('calc-result');
        calcResult.textContent = translations[lang]['calc-result'].replace('{symbol}', currencySymbols[currency]);
        // Update Balance
        updateBalance(currency);
        // Update Transactions
        updateTransactions(lang, currency);
        // Update Loan Cards
        updateLoanCards(lang, currency);
        // Update Notifications
        updateNotifications(lang, currency);
        // Update Savings Goals
        updateSavingsGoals(lang, currency);
        // Update Contribution Tracker
        updateContribution(lang, currency);
    }

    languageSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value, currentCurrency);
    });

    // Currency Switcher
    const currencySelect = document.getElementById('currency-select');
    currencySelect.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        updateLanguage(languageSelect.value, currentCurrency);
        document.getElementById('calc-amount').dispatchEvent(new Event('input')); // Trigger calculator update
        updateChart(currentCurrency);
    });

    // Profile Picture Upload
    const profileAvatar = document.getElementById('profile-avatar');
    const profileUpload = document.getElementById('profile-upload');
    const uploadBtn = document.getElementById('upload-btn');

    uploadBtn.addEventListener('click', () => profileUpload.click());
    profileAvatar.addEventListener('click', () => profileUpload.click());

    profileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be under 2MB.');
                return;
            }
            profileAvatar.classList.add('loading');
            setTimeout(() => {
                const reader = new FileReader();
                reader.onload = () => {
                    profileAvatar.style.backgroundImage = `url(${reader.result})`;
                    profileAvatar.classList.remove('loading');
                };
                reader.readAsDataURL(file);
            }, 1000);
        }
    });

    // Load Profile
    const profileName = document.getElementById('profile-name');
    const profileId = document.getElementById('profile-id');
    const profileJoined = document.getElementById('profile-joined');
    profileName.textContent = mockApi.profile.name;
    profileId.textContent = `Member ID: ${mockApi.profile.id}`;
    profileJoined.textContent = `Joined: ${new Date(mockApi.profile.joined).toLocaleDateString()}`;
    profileAvatar.style.backgroundImage = `url(${mockApi.profile.avatar})`;

    // Edit Profile (Placeholder)
    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        alert('Edit profile functionality coming soon!');
    });

    // Load Balance
    const balanceAmount = document.getElementById('balance-amount');
    const balanceStatus = document.getElementById('balance-status');
    function updateBalance(currency) {
        balanceAmount.textContent = formatCurrency(mockApi.balance.amount, currency);
        balanceStatus.textContent = translations[languageSelect.value]['balance-status'];
        balanceStatus.className = `balance-status ${mockApi.balance.amount >= 0 ? 'positive' : 'negative'}`;
        // Check for low balance notification
        if (mockApi.balance.amount < 6000 && !mockApi.notifications.some(n => n.message.includes('below'))) {
            addNotification('Your balance is below {symbol}6,000.', currency);
        }
    }

    // Contribution Tracker
    const contributionStatus = document.getElementById('contribution-status');
    const contributionProgress = document.getElementById('contribution-progress');
    const contributionAmount = document.getElementById('contribution-amount');
    function updateContribution(lang, currency) {
        const progress = (mockApi.contribution.current / mockApi.contribution.target) * 100;
        contributionStatus.textContent = progress >= 100 ? translations[lang]['contribution-status'] : `${Math.round(progress)}% of your goal`;
        contributionProgress.style.width = `${progress}%`;
        contributionAmount.textContent = `${formatCurrency(mockApi.contribution.current, currency)} / ${formatCurrency(mockApi.contribution.target, currency)}`;
    }

    // Chart.js for Balance Trend
    const ctx = document.getElementById('balanceChart').getContext('2d');
    const balanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: `Balance (${currencySymbols[currentCurrency]})`,
                data: [4000, 4200, 4500, 4700, 5000, 5230],
                borderColor: '#8ECAE6',
                backgroundColor: 'rgba(142, 202, 230, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });

    function updateChart(currency) {
        balanceChart.data.datasets[0].label = `Balance (${currencySymbols[currency]})`;
        balanceChart.update();
    }

    // Transactions with Pagination and Filtering
    const transactionBody = document.getElementById('transaction-body');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const filterSelect = document.getElementById('transaction-filter');
    let currentPage = 1;
    const itemsPerPage = 3;
    let currentFilter = 'all';

    function updateTransactions(lang, currency) {
        let filteredTransactions = mockApi.transactions;
        if (currentFilter !== 'all') {
            filteredTransactions = mockApi.transactions.filter(tx => tx.type === currentFilter);
        }
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginated = filteredTransactions.slice(start, end);
        transactionBody.innerHTML = '';
        paginated.forEach(tx => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tx.date}</td>
                <td data-lang-key="type-${tx.type}">${translations[lang][`type-${tx.type}`]}</td>
                <td class="${tx.amount >= 0 ? 'positive' : 'negative'}">${tx.amount >= 0 ? '+' : ''}${formatCurrency(Math.abs(tx.amount), currency)}</td>
                <td data-lang-key="desc-${tx.description.toLowerCase().replace(' ', '-')}">${translations[lang][`desc-${tx.description.toLowerCase().replace(' ', '-')}`]}</td>
            `;
            transactionBody.appendChild(row);
        });
        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        pageInfo.textContent = translations[lang]['page-info'].replace('{current}', currentPage).replace('{total}', totalPages || 1);
        prevPage.disabled = currentPage === 1;
        nextPage.disabled = currentPage === totalPages || totalPages === 0;
    }

    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTransactions(languageSelect.value, currentCurrency);
        }
    });

    nextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(mockApi.transactions.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTransactions(languageSelect.value, currentCurrency);
        }
    });

    filterSelect.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        currentPage = 1;
        updateTransactions(languageSelect.value, currentCurrency);
    });

    // Export CSV
    const exportBtn = document.querySelector('.export-btn');
    exportBtn.addEventListener('click', () => {
        let filteredTransactions = mockApi.transactions;
        if (currentFilter !== 'all') {
            filteredTransactions = mockApi.transactions.filter(tx => tx.type === currentFilter);
        }
        const csvContent = [
            'Date,Type,Amount,Description',
            ...filteredTransactions.map(tx => `${tx.date},${tx.type},${formatCurrency(tx.amount, currentCurrency).replace(currencySymbols[currentCurrency], '')},${tx.description}`)
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Loan Status with Progress
    const loanStatusGrid = document.getElementById('loan-status-grid');
    const modal = document.getElementById('loan-details-modal');
    const modalLoanId = document.getElementById('modal-loan-id');
    const modalLoanAmount = document.getElementById('modal-loan-amount');
    const modalLoanTerm = document.getElementById('modal-loan-term');
    const modalLoanStatus = document.getElementById('modal-loan-status');
    const modalLoanDate = document.getElementById('modal-loan-date');
    const modalProgressBar = document.getElementById('modal-progress-bar');
    const modalProgressText = document.getElementById('modal-progress-text');
    const modalRepaymentHistory = document.getElementById('modal-repayment-history');

    function updateLoanCards(lang, currency) {
        loanStatusGrid.innerHTML = '';
        mockApi.loans.forEach(loan => {
            const progress = (loan.repaid / loan.amount) * 100;
            const card = document.createElement('div');
            card.className = 'loan-card';
            card.innerHTML = `
                <h4>Loan #${loan.id}</h4>
                <p data-lang-key="loan-amount">${translations[lang]['loan-amount']}: ${formatCurrency(loan.amount, currency)}</p>
                <p data-lang-key="loan-status">${translations[lang]['loan-status']}: <span class="status ${loan.status.toLowerCase()}" data-lang-key="status-${loan.status.toLowerCase()}">${translations[lang][`status-${loan.status.toLowerCase()}`]}</span></p>
                <div class="progress-container">
                    <p data-lang-key="progress-label">${translations[lang]['progress-label']}:</p>
                    <div class="progress-bar">
                        <div style="width: ${progress}%"></div>
                    </div>
                    <p>${progress.toFixed(0)}% (${formatCurrency(loan.repaid, currency)} / ${formatCurrency(loan.amount, currency)})</p>
                </div>
                <button class="details-btn" data-loan-id="${loan.id}" aria-label="View details for Loan #${loan.id}" data-lang-key="details-btn">${translations[lang]['details-btn']}</button>
            `;
            loanStatusGrid.appendChild(card);
        });
        // Re-attach event listeners
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const loanId = btn.getAttribute('data-loan-id');
                const loan = mockApi.loanDetails[loanId];
                if (loan) {
                    modalLoanId.textContent = loan.id;
                    modalLoanAmount.textContent = formatCurrency(loan.amount, currentCurrency);
                    modalLoanTerm.textContent = loan.term;
                    modalLoanStatus.textContent = translations[languageSelect.value][`status-${loan.status.toLowerCase()}`];
                    modalLoanDate.textContent = loan.date;
                    const progress = (loan.repaid / loan.amount) * 100;
                    modalProgressBar.style.width = `${progress}%`;
                    modalProgressText.textContent = `${progress.toFixed(0)}% (${formatCurrency(loan.repaid, currentCurrency)} / ${formatCurrency(loan.amount, currentCurrency)})`;
                    modalRepaymentHistory.innerHTML = loan.history.map(h => `
                        <tr>
                            <td>${h.date}</td>
                            <td>${formatCurrency(h.amount, currentCurrency)}</td>
                        </tr>
                    `).join('');
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                    modal.querySelector('.modal-content').focus();
                }
            });
        });
    }

    // Download Loan Details as PDF
    const { jsPDF } = window.jspdf;
    document.getElementById('download-loan-btn').addEventListener('click', () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Loan Details', 20, 20);
        doc.setFontSize(12);
        doc.text(`Loan ID: ${modalLoanId.textContent}`, 20, 30);
        doc.text(`Amount: ${modalLoanAmount.textContent}`, 20, 40);
        doc.text(`Term: ${modalLoanTerm.textContent}`, 20, 50);
        doc.text(`Status: ${modalLoanStatus.textContent}`, 20, 60);
        doc.text(`Request Date: ${modalLoanDate.textContent}`, 20, 70);
        doc.text(`Repayment Progress: ${modalProgressText.textContent}`, 20, 80);
        doc.text('Repayment History:', 20, 100);
        let y = 110;
        mockApi.loanDetails[modalLoanId.textContent].history.forEach((h, i) => {
            doc.text(`${i + 1}. Date: ${h.date}, Amount: ${formatCurrency(h.amount, currentCurrency)}`, 20, y);
            y += 10;
        });
        doc.save(`loan_${modalLoanId.textContent}.pdf`);
    });

    // Loan Request Form
    const loanForm = document.getElementById('loan-form');
    loanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = loanForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        setTimeout(() => {
            const amount = parseFloat(document.getElementById('loan-amount').value);
            const term = document.getElementById('repayment-term').value;
            const purpose = document.getElementById('loan-purpose').value;
            const newLoan = {
                id: (mockApi.loans.length + 123).toString(),
                amount,
                term: `${term} Months`,
                status: 'Pending',
                date: new Date().toISOString().split('T')[0],
                repaid: 0
            };
            mockApi.loans.push(newLoan);
            mockApi.loanDetails[newLoan.id] = { ...newLoan, history: [] };
            updateLoanCards(languageSelect.value, currentCurrency);
            addNotification(`Loan #${newLoan.id} is pending approval.`, currentCurrency);
            loanForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 1000);
    });

    // Savings Goals
    const savingsGoalsGrid = document.getElementById('savings-goals');
    const savingsForm = document.getElementById('savings-goal-form');
    function updateSavingsGoals(lang, currency) {
        savingsGoalsGrid.innerHTML = '';
        mockApi.savingsGoals.forEach(goal => {
            const progress = (goal.current / goal.target) * 100;
            const card = document.createElement('div');
            card.className = 'savings-goal-card';
            card.innerHTML = `
                <h4>${goal.name}</h4>
                <p>${formatCurrency(goal.current, currency)} / ${formatCurrency(goal.target, currency)}</p>
                ${goal.deadline ? `<p>Due: ${goal.deadline}</p>` : ''}
                <div class="progress-container">
                    <div class="progress-bar">
                        <div style="width: ${progress}%"></div>
                    </div>
                    <p>${progress.toFixed(0)}%</p>
                </div>
            `;
            savingsGoalsGrid.appendChild(card);
        });
    }

    savingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('savings-name').value;
        const target = parseFloat(document.getElementById('savings-target').value);
        const deadline = document.getElementById('savings-deadline').value;
        const newGoal = { name, target, current: 0, deadline };
        mockApi.savingsGoals.push(newGoal);
        updateSavingsGoals(languageSelect.value, currentCurrency);
        savingsForm.reset();
        // Simulate savings progress for demo
        setTimeout(() => {
            newGoal.current = target * 0.5;
            updateSavingsGoals(languageSelect.value, currentCurrency);
            addNotification(translations[languageSelect.value]['notification-savings-50'].replace('{name}', newGoal.name), currentCurrency);
        }, 2000);
        setTimeout(() => {
            newGoal.current = target;
            updateSavingsGoals(languageSelect.value, currentCurrency);
            addNotification(translations[languageSelect.value]['notification-savings-100'].replace('{name}', newGoal.name), currentCurrency);
        }, 4000);
    });

    // Notifications
    const notificationsToggle = document.querySelector('.notifications-toggle');
    const notificationsPanel = document.querySelector('.notifications-panel');
    function updateNotifications(lang, currency) {
        notificationsPanel.innerHTML = '';
        mockApi.notifications.forEach(n => {
            const div = document.createElement('div');
            div.className = `notification ${n.read ? 'read' : ''}`;
            const message = translations[lang][`notification-${n.id}`] || n.message;
            div.innerHTML = `
                <p>${message.replace('{symbol}', currencySymbols[currency])}</p>
                <span>${n.timestamp}</span>
                ${!n.read ? `<button data-id="${n.id}" data-lang-key="mark-read">${translations[lang]['mark-read']}</button>` : ''}
            `;
            notificationsPanel.appendChild(div);
        });
        const unreadCount = mockApi.notifications.filter(n => !n.read).length;
        notificationsToggle.textContent = translations[lang]['notifications'].replace('{count}', unreadCount);
        // Re-attach event listeners
        document.querySelectorAll('.notification button').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const notification = mockApi.notifications.find(n => n.id === id);
                if (notification) {
                    notification.read = true;
                    updateNotifications(languageSelect.value, currentCurrency);
                }
            });
        });
    }

    notificationsToggle.addEventListener('click', () => {
        const isExpanded = notificationsToggle.getAttribute('aria-expanded') === 'true';
        notificationsToggle.setAttribute('aria-expanded', !isExpanded);
        notificationsPanel.classList.toggle('active');
    });

    function addNotification(message, currency) {
        const id = mockApi.notifications.length + 1;
        const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
        mockApi.notifications.unshift({ id, message, timestamp, read: false });
        updateNotifications(languageSelect.value, currency);
    }

    // Loan Calculator
    const calcAmount = document.getElementById('calc-amount');
    const calcRate = document.getElementById('calc-rate');
    const calcTerm = document.getElementById('calc-term');
    const calcResult = document.getElementById('calc-result');
    const calculateBtn = document.querySelector('.calculate-btn');

    function calculateLoan() {
        const amount = parseFloat(calcAmount.value) || 0;
        const rate = parseFloat(calcRate.value) / 100 / 12; // Monthly rate
        const term = parseInt(calcTerm.value);
        const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        calcResult.textContent = translations[languageSelect.value]['calc-result'].replace('{symbol}', currencySymbols[currentCurrency]).replace('86.67', monthlyPayment.toFixed(2));
    }

    calcAmount.addEventListener('input', calculateLoan);
    calcRate.addEventListener('input', calculateLoan);
    calcTerm.addEventListener('change', calculateLoan);
    calculateBtn.addEventListener('click', calculateLoan);

    // Deposit Modal
    const depositBtn = document.getElementById('deposit-btn');
    const depositModal = document.getElementById('deposit-modal');
    const depositForm = document.getElementById('deposit-form');
    depositBtn.addEventListener('click', () => {
        depositModal.classList.add('active');
        depositModal.setAttribute('aria-hidden', 'false');
        depositModal.querySelector('.modal-content').focus();
    });

    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = depositForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        setTimeout(() => {
            const amount = parseFloat(document.getElementById('deposit-amount').value);
            mockApi.balance.amount += amount;
            mockApi.contribution.current = Math.min(mockApi.contribution.current + amount, mockApi.contribution.target);
            mockApi.transactions.unshift({
                date: new Date().toISOString().split('T')[0],
                type: 'deposit',
                amount,
                description: 'Deposit'
            });
            updateBalance(currentCurrency);
            updateContribution(languageSelect.value, currentCurrency);
            updateTransactions(languageSelect.value, currentCurrency);
            addNotification(`Deposit of ${formatCurrency(amount, currentCurrency)} confirmed.`, currentCurrency);
            depositModal.classList.remove('active');
            depositModal.setAttribute('aria-hidden', 'true');
            depositForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 1000);
    });

    // Settings Form
    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('settings-email').value;
        const notificationsEnabled = document.getElementById('settings-notifications').checked;
        mockApi.settings.email = email;
        mockApi.settings.notificationsEnabled = notificationsEnabled;
        alert('Settings saved successfully!');
    });

    // Modal Close
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
    });

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode');
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkModeToggle.checked);
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    // Contact Support (Placeholder)
    document.querySelectorAll('[data-lang-key="support-btn"]').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Contact support functionality coming soon!');
        });
    });

    // Initialize Dashboard
    updateLanguage('en', currentCurrency);
    calculateLoan();
});