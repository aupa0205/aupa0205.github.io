function qs(sel, root=document) {
    return root.querySelector(sel);
}

function qsa(sel, root=document) {
    return Array.from(root.querySelectorAll(sel));
}

function setupNavToggle() {
    const navToggle = qs('.nav-toggle');
    const navMenu = qs('.nav-menu');

    


    navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") == "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("show")
    navToggle.classList.toggle("active")
    });

    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

function setupSearchFilter () {
    const input = qs('#search-input');
    const needSelect = qs('#need-select');
    const clearBtn = qs('#clear-filters');
    const cards = qsa('.fridge-card');
    const resultsAnnounce = qs('#results-announce');

    function filterCards() {
        const q = input.value.trim().toLowerCase();
        const need = needSelect.value;
        let visible = 0;

        cards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const neighborhood = (card.dataset.neighborhood || ' ').toLowerCase();
            const matchesQuery = !q || name.includes(q) || neighborhood.includes(q)
            needSelect.includes(q);
            const matchesNeed = !need || needSelect.includes(need);

            if (matchesQuery && matchesNeed) {
                card.style.display = '';
                visible++;
            } else {
                card.style.display = 'none';
            }
        });

        resultsAnnounce.textContent = '${visible} results';
    }

    input.addEventListener('input', filterCards);
    needSelect.addEventListener('change', filterCards);
    clearBtn.addEventListener('click', () => {
        input.value = '';
        needSelect.value = '';
        filterCards();
        input.focus();
    })

    filterCards();
}

function setupPreferences() {
    const remember = qs('#remember-pref');
    const prefArea = qs('#preference-area');
    const saved = localStorage.getItem('preferredFridgeName');
    if (saved) {
        prefArea.textContent = 'Preferred fridge ${saved}';
        remember.checked = true;
    }

    remember.addEventListener('change', () => {
        if (remember.checked) {
            const first = qsa('.fridge-card').find(c => c.style.display !== 'none'
                && c.offsetParent !== null);
            
            if (first) {
                const name = first.dataset.name;
                localStorage.setItem('preferredFridgeName', name);
                qs('#preference-area').textContent = 'Preferred fridge: ${name}';
            }
            else {
                qs('#preference-area').textContent ='No visible fridge to set as preferred';
            }
        } else {
            localStorage.removeItem('preferredFridgeName');
            qs('#preference-area').textContent = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavToggle();
    setupSearchFilter();
    setupPreferences();
});