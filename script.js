document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('artifact-title');
    const categoryInput = document.getElementById('artifact-category');
    const imageInput = document.getElementById('artifact-image');
    const addBtn = document.getElementById('add-btn');
    const errorMsg = document.getElementById('error-msg');
    
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('search-input');
    const counter = document.getElementById('counter');
    const themeBtn = document.getElementById('theme-btn');
    
    const categoryTabsContainer = document.getElementById('category-tabs');
    
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const closeModal = document.getElementById('close-modal');

    const show2btn = document.querySelector("#show2BTN");
    const cancelbtn = document.querySelector("#cancel");

    let categories = new Set();
    let artifactsCount = 0;

    function updateCounter(change) {
        artifactsCount += change;
        counter.textContent = `Артефактов: ${artifactsCount}`;
    }

    function createCategoryTab(category) {
        const normalizedCategory = category.trim();
        if (!categories.has(normalizedCategory.toLowerCase())) {
            categories.add(normalizedCategory.toLowerCase());
            
            const btn = document.createElement('button');
            btn.classList.add('tab-btn');
            btn.textContent = normalizedCategory;
            btn.dataset.category = normalizedCategory.toLowerCase();
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterCards(normalizedCategory.toLowerCase());
            });
            
            categoryTabsContainer.appendChild(btn);
        }
    }

    function filterCards(filterValue) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardCategory = card.dataset.category.toLowerCase();
            const cardTitle = card.querySelector('h4').textContent.toLowerCase();
            const matchesCategory = filterValue === 'all' || cardCategory === filterValue;
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            if (title.includes(value)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    document.querySelector('[data-category="all"]').addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filterCards('all');
    });


    addBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const category = categoryInput.value.trim();
        const image = imageInput.value.trim();

        if (!title || !category || !image) {
            errorMsg.classList.remove('hidden');
            setTimeout(() => errorMsg.classList.add('hidden'), 3000);
            return;
        }

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.category = category; 

        card.innerHTML = `
            <img src="${image}" alt="${title}" class="card-img">
            <div class="card-body">
                <h4>${title}</h4>
                <p>Категория: ${category}</p>
            </div>
            <div class="card-footer">
                <button class="fav-btn" title="В избранное">❤</button>
                <button class="del-btn">Удалить</button>
            </div>
        `;

        card.addEventListener('mouseover', () => {
            card.classList.add('highlight');
        });
        card.addEventListener('mouseout', () => {
            card.classList.remove('highlight');
        });

        card.querySelector('.del-btn').addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            const deletedCategory = card.dataset.category.toLowerCase();
            card.remove();
            updateCounter(-1);
            const remainingCards = document.querySelectorAll(`.card[data-category="${card.dataset.category}"]`);
            
            if (remainingCards.length === 0) {
                categories.delete(deletedCategory);
                
                const categoryTab = document.querySelector(`.tab-btn[data-category="${deletedCategory}"]`);
                if (categoryTab) {
                    categoryTab.remove();
                }
                
                const allTab = document.querySelector('.tab-btn[data-category="all"]');
                allTab.classList.add('active');
                filterCards('all');
            }
        });


        card.querySelector('.fav-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            e.target.classList.toggle('active');
        });

        card.querySelector('.card-img').addEventListener('click', () => {
            modalImg.src = image;
            modalTitle.textContent = title;
            modalCategory.textContent = `Категория: ${category}`;
            modal.classList.remove('hidden');
        });

        gallery.appendChild(card);
        
        createCategoryTab(category);
        updateCounter(1);

        titleInput.value = '';
        categoryInput.value = '';
        imageInput.value = '';
        errorMsg.classList.add('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.add('hidden');
        }
    });

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
    document.getElementById('show-favorites').addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const isFavorite = card.querySelector('.fav-btn').classList.contains('active');
        card.style.display = isFavorite ? 'flex' : 'none';
    });
});

show2btn.addEventListener("click", () => {
    cancelbtn.classList.toggle("hidden");
});

cancelbtn.addEventListener("click", () => {
    document.body.style.backgroundImage.src = "2025-12-09_16-39-22.png";
});


});

