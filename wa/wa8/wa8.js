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
            const matchesNeed = !need || card.dataset.needs.includes(need);

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

function setTheme(theme) {
    let inTheme = theme;
    if (inTheme == 'dark') {
        theme = 'light';
    }
    else {
        theme ='dark';
    }
    localStorage.setItem('userTheme', theme);
    document.body.className = theme;
}

window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('userTheme') || 'light';
    document.body.className = savedTheme;
});

let btn = document.querySelector('#theme').addEventListener('click', theme)

function theme() {
    setTheme("light");
}

document.querySelector('#clearData').addEventListener('click', () => {
    localStorage.clear();
    document.body.className = 'light';
    alert("Your saved data has been cleared.");
});

document.querySelector('#savePreference').addEventListener('click', function() {
  const preference = document.querySelector('#userPreference').value;
  localStorage.setItem('userPreference', preference);
  alert('Your preference has been saved: ' + preference);
});

window.addEventListener('load', function() {
  const savedPref = localStorage.getItem('userPreference');
  if (savedPref) {
    document.querySelector('#userPreference').value = savedPref;
    console.log('User preference loaded:', savedPref);

     }
});