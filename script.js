// Sample data
const bloodCamps = [
    { 
        id: 1, 
        location: "IIT Patna Campus", 
        date: "2024-04-15", 
        time: "10:00 AM - 4:00 PM",
        venue: "Main Auditorium",
        organizer: "NSS Blood Donation Team",
        expectedDonors: 50,
        registeredDonors: 32
    },
    { 
        id: 2, 
        location: "Patna Medical College", 
        date: "2024-04-20", 
        time: "9:00 AM - 3:00 PM",
        venue: "Blood Bank Center",
        organizer: "PMC Medical Team",
        expectedDonors: 100,
        registeredDonors: 45
    }
];

const bloodRequests = [
    { 
        id: 1, 
        bloodType: "A+", 
        location: "Patna", 
        contact: "9876543210",
        patientName: "Rahul Kumar",
        hospital: "AIIMS Patna",
        unitsNeeded: 2,
        urgency: "Within 48 hours"
    },
    { 
        id: 2, 
        bloodType: "O-", 
        location: "Danapur", 
        contact: "9876543211",
        patientName: "Priya Singh",
        hospital: "Patna Medical College",
        unitsNeeded: 3,
        urgency: "Within 24 hours"
    }
];

const fundraisingCampaigns = [
    { 
        id: 1, 
        title: "Education for Underprivileged Children", 
        target: 50000, 
        raised: 27500, 
        description: "Help provide educational materials and support for children in rural areas around Patna.",
        daysLeft: 12,
        organizer: "NSS Education Team",
        percentComplete: 55
    },
    { 
        id: 2, 
        title: "Medical Camp in Rural Bihar", 
        target: 75000, 
        raised: 45000, 
        description: "Support a medical camp providing free healthcare services in remote villages.",
        daysLeft: 8,
        organizer: "NSS Health Initiative",
        percentComplete: 60
    },
    { 
        id: 3, 
        title: "Clean Water Project", 
        target: 100000, 
        raised: 62000, 
        description: "Help install water purification systems in villages with contaminated water sources.",
        daysLeft: 15,
        organizer: "NSS Environmental Team",
        percentComplete: 62
    }
];

const itemCategories = [
    { 
        id: 1, 
        name: "Cycles", 
        description: "Donate used cycles in good condition", 
        icon: "🚲",
        itemsNeeded: 15,
        itemsDonated: 8,
        location: "NSS Storage Facility, IIT Patna"
    },
    { 
        id: 2, 
        name: "Clothes", 
        description: "Donate clean and wearable clothes", 
        icon: "👕",
        itemsNeeded: 200,
        itemsDonated: 145,
        location: "NSS Collection Center"
    },
    { 
        id: 3, 
        name: "Books", 
        description: "Donate educational books and study materials", 
        icon: "📚",
        itemsNeeded: 100,
        itemsDonated: 67,
        location: "Library, IIT Patna"
    }
];

// Function to update navigation buttons
function updateNavButtons(activeSection) {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase().includes(activeSection.toLowerCase())) {
            button.classList.add('active');
        }
    });
}

// Function to show blood donation section
function showBloodDonation() {
    hideAllSections();
    updateNavButtons('blood');
    const section = document.getElementById('blood-donation');
    section.classList.remove('hidden');
    
    // Filter out completed blood camps
    const activeCamps = bloodCamps.filter(camp => camp.registeredDonors < camp.expectedDonors);
    
    // Display blood camps
    const campsList = document.getElementById('blood-camps-list');
    if (activeCamps.length === 0) {
        campsList.innerHTML = '<p class="no-items">No active blood donation camps at the moment.</p>';
    } else {
        campsList.innerHTML = activeCamps.map(camp => `
            <div class="campaign-card">
                <div class="camp-info">
                    <h3>${camp.location}</h3>
                    <p class="venue">📍 ${camp.venue}</p>
                    <p class="date">📅 ${camp.date} ⏰ ${camp.time}</p>
                    <p class="organized-by">Organized by: ${camp.organizer}</p>
                </div>
                <div class="campaign-info">
                    <div class="amount-raised">${camp.registeredDonors} Donors</div>
                    <div class="days-left">Target: ${camp.expectedDonors}</div>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(camp.registeredDonors / camp.expectedDonors) * 100}%"></div>
                </div>
                <button class="donate-button" onclick="registerForBloodDonation(${camp.id})">Register as Donor</button>
            </div>
        `).join('');
    }

    // Filter out fulfilled blood requests
    const activeRequests = bloodRequests.filter(request => !request.fulfilled);
    
    // Display blood requests
    const requestsList = document.getElementById('blood-requests-list');
    if (activeRequests.length === 0) {
        requestsList.innerHTML = '<p class="no-items">No active blood requests at the moment.</p>';
    } else {
        requestsList.innerHTML = activeRequests.map(request => `
            <div class="campaign-card">
                <div class="blood-type-header">
                    <span class="blood-icon">🩸</span>
                    <h3>Blood Type: ${request.bloodType}</h3>
                </div>
                <div class="request-details">
                    <p>Patient: ${request.patientName}</p>
                    <p>Hospital: ${request.hospital}</p>
                    <p>Units Needed: ${request.unitsNeeded}</p>
                    <p>Required: ${request.urgency}</p>
                </div>
                <div class="contact-info">
                    <p>📍 ${request.location}</p>
                    <p>📞 ${request.contact}</p>
                </div>
            </div>
        `).join('');
    }
}

// Function to show fundraising section
function showFundraising() {
    hideAllSections();
    updateNavButtons('fund');
    const section = document.getElementById('fundraising');
    section.classList.remove('hidden');
    
    // Filter out completed campaigns
    const activeCampaigns = fundraisingCampaigns.filter(campaign => campaign.raised < campaign.target);
    
    const campaignsList = document.getElementById('fundraising-campaigns');
    if (activeCampaigns.length === 0) {
        campaignsList.innerHTML = '<p class="no-items">No active fundraising campaigns at the moment.</p>';
    } else {
        campaignsList.innerHTML = activeCampaigns.map(campaign => `
            <div class="campaign-card">
                <h3>${campaign.title}</h3>
                <p>${campaign.description}</p>
                <div class="campaign-info">
                    <div class="amount-raised">₹${campaign.raised.toLocaleString()}</div>
                    <div class="days-left">${campaign.daysLeft} days left</div>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${campaign.percentComplete}%"></div>
                </div>
                <div class="target-amount">Target: ₹${campaign.target.toLocaleString()}</div>
                <p class="organized-by">Organized by: ${campaign.organizer}</p>
                <div class="donation-amount">
                    <input type="number" id="amount-${campaign.id}" placeholder="Enter amount" min="1" max="${campaign.target - campaign.raised}">
                    <button class="donate-button" onclick="donateToCampaign(${campaign.id})">Donate Now</button>
                </div>
                <p class="amount-error" id="error-${campaign.id}">Please enter a valid amount</p>
            </div>
        `).join('');
    }
}

// Function to show item donation section
function showItemDonation() {
    hideAllSections();
    updateNavButtons('item');
    const section = document.getElementById('item-donation');
    section.classList.remove('hidden');
    
    const categoriesList = document.getElementById('item-categories');
    if (itemCategories.length === 0) {
        categoriesList.innerHTML = '<p class="no-items">No item donation categories available at the moment.</p>';
    } else {
        categoriesList.innerHTML = itemCategories.map(category => `
            <div class="campaign-card">
                <div class="item-header">
                    <h3>${category.name}</h3>
                    <span class="item-icon">${category.icon}</span>
                </div>
                <p>${category.description}</p>
                <div class="donation-info">
                    <p class="items-count">${category.itemsDonated} items donated</p>
                </div>
            </div>
        `).join('');
    }
}

// Function to hide all sections
function hideAllSections() {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
}

// Function to handle donation to a campaign
function donateToCampaign(campaignId) {
    const campaign = fundraisingCampaigns.find(c => c.id === campaignId);
    if (campaign) {
        const amountInput = document.getElementById(`amount-${campaignId}`);
        const errorElement = document.getElementById(`error-${campaignId}`);
        const amount = parseInt(amountInput.value);
        
        if (!amount || amount <= 0) {
            errorElement.textContent = "Please enter a valid amount";
            errorElement.classList.add('show');
            return;
        }
        
        if (amount > (campaign.target - campaign.raised)) {
            errorElement.textContent = `Amount cannot exceed ₹${(campaign.target - campaign.raised).toLocaleString()}`;
            errorElement.classList.add('show');
            return;
        }
        
        campaign.raised += amount;
        campaign.percentComplete = Math.round((campaign.raised / campaign.target) * 100);
        
        if (campaign.raised >= campaign.target) {
            alert(`Congratulations! The campaign "${campaign.title}" has reached its target! Thank you for your donation of ₹${amount.toLocaleString()}`);
        } else {
            alert(`Thank you for your donation of ₹${amount.toLocaleString()}!`);
        }
        
        showFundraising(); // Refresh the view
    }
}

function registerForBloodDonation(campId) {
    const camp = bloodCamps.find(c => c.id === campId);
    if (camp) {
        camp.registeredDonors++;
        if (camp.registeredDonors >= camp.expectedDonors) {
            alert(`Thank you for registering! The blood donation camp at ${camp.location} has reached its target number of donors.`);
        } else {
            alert(`Thank you for your interest in donating blood at ${camp.location}. Our team will contact you for registration details.`);
        }
        showBloodDonation(); // Refresh the view
    }
}

function donateItem(categoryId) {
    const category = itemCategories.find(c => c.id === categoryId);
    if (category) {
        category.itemsDonated++;
        if (category.itemsDonated >= category.itemsNeeded) {
            alert(`Thank you! We have reached our target for ${category.name.toLowerCase()} donations.`);
        } else {
            alert(`Thank you for your interest in donating ${category.name.toLowerCase()}. Please bring your items to ${category.location}.`);
        }
        showItemDonation(); // Refresh the view
    }
}

function handleLogout() {
    // Here you would typically clear any session/local storage or cookies
    window.location.href = 'login.html';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show fundraising section by default
    showFundraising();
});

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function showAddBloodEvent() {
    showModal('addBloodCampModal');
}

function showAddBloodRequest() {
    showModal('addBloodRequestModal');
}

function showAddFundraiser() {
    showModal('addFundraiserModal');
}

// Form submission handlers
function handleAddBloodCamp(event) {
    event.preventDefault();
    const newCamp = {
        id: bloodCamps.length + 1,
        location: document.getElementById('camp-location').value,
        venue: document.getElementById('camp-venue').value,
        date: document.getElementById('camp-date').value,
        time: document.getElementById('camp-time').value,
        organizer: document.getElementById('camp-organizer').value,
        expectedDonors: parseInt(document.getElementById('camp-target').value),
        registeredDonors: 0
    };

    bloodCamps.push(newCamp);
    hideModal('addBloodCampModal');
    showBloodDonation(); // Refresh the view
    event.target.reset();
    return false;
}

function handleAddBloodRequest(event) {
    event.preventDefault();
    const newRequest = {
        id: bloodRequests.length + 1,
        bloodType: document.getElementById('request-blood-type').value,
        patientName: document.getElementById('request-patient').value,
        hospital: document.getElementById('request-hospital').value,
        unitsNeeded: parseInt(document.getElementById('request-units').value),
        urgency: document.getElementById('request-urgency').value,
        location: document.getElementById('request-location').value,
        contact: document.getElementById('request-contact').value
    };

    bloodRequests.push(newRequest);
    hideModal('addBloodRequestModal');
    showBloodDonation(); // Refresh the view
    event.target.reset();
    return false;
}

function handleAddFundraiser(event) {
    event.preventDefault();
    const newFundraiser = {
        id: fundraisingCampaigns.length + 1,
        title: document.getElementById('fundraiser-title').value,
        description: document.getElementById('fundraiser-description').value,
        target: parseInt(document.getElementById('fundraiser-target').value),
        raised: 0,
        daysLeft: parseInt(document.getElementById('fundraiser-days').value),
        organizer: document.getElementById('fundraiser-organizer').value,
        percentComplete: 0
    };

    fundraisingCampaigns.push(newFundraiser);
    hideModal('addFundraiserModal');
    showFundraising(); // Refresh the view
    event.target.reset();
    return false;
} 