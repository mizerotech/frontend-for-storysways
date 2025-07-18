// js/script.js

// A map to link HTML element IDs to their translation keys in the JSON files
// ENSURE THESE IDs MATCH THE ONES YOU ADDED IN YOUR HTML FILES
// AND THE KEYS MATCH THE ONES IN YOUR JSON FILES.
const translationMap = {
    // Navigation (from header.html/index.html)
    'navHome': 'nav_home',
    'navNews': 'nav_news',
    'navPRServices': 'nav_pr_services',
    'navStartups': 'nav_startups',
    'navIgniteTalk': 'nav_ignite_talk',

    // Header Search Input Placeholder (from header.html/index.html)
    'headerSearchInput': 'search_placeholder',

    // Index.html Main Content
    'mainHeading': 'main_heading',
    'missionHeading': 'mission_heading',
    'missionParagraph': 'mission_paragraph',
    'visionHeading': 'vision_heading',
    'visionParagraph': 'vision_paragraph',
    'coreValuesHeading': 'core_values_heading',
    'empowermentValueTitle': 'empowerment_value_title',
    'empowermentValueDesc': 'empowerment_value_desc',
    'authenticityValueTitle': 'authenticity_value_title',
    'authenticityValueDesc': 'authenticity_value_desc',
    'innovationValueTitle': 'innovation_value_title',
    'innovationValueDesc': 'innovation_value_desc',
    'collaborationValueTitle': 'collaboration_value_title',
    'collaborationValueDesc': 'collaboration_value_desc',
    'sustainabilityValueTitle': 'sustainability_value_title',
    'sustainabilityValueDesc': 'sustainability_value_desc',
    'whatWeDoHeading': 'what_we_do_heading',
    'trainYouthTitle': 'train_youth_title',
    'trainYouthDesc': 'train_youth_desc',
    'providePRTitle': 'provide_pr_title',
    'providePRDesc': 'provide_pr_desc',
    'bridgeGapTitle': 'bridge_gap_title',
    'bridgeGapDesc': 'bridge_gap_desc',
    'strengthenMediaTitle': 'strengthen_media_title',
    'strengthenMediaDesc': 'strengthen_media_desc',

    // Footer (from footer.html/index.html)
    'footerCareers': 'footer_careers',
    'footerContact': 'footer_contact',
    'newsletterText': 'newsletter_subscribe_text',
    'newsletterEmailInput': 'newsletter_email_placeholder', // For placeholder attribute
    'subscribeButton': 'subscribe_button',
    'copyrightText': 'copyright_text',

    // articles.html specific elements
    'articlesPageTitle': 'articles_page_title',
    'articlesSearchInput': 'search_placeholder', // Re-use search_placeholder key
    'articlesSearchButton': 'articles_search_button',
    'noArticlesFound': 'no_articles_found', // For messages on articles.html
    'errorLoadingArticles': 'error_loading_articles', // For messages on articles.html

    // article.html specific elements
    'loadingArticleText': 'loading_article_text', // For initial loading message
    'articleNotFoundText': 'article_not_found', // For article not found message
    'articleAuthorLabel': 'article_author_label',
    'articleCategoryLabel': 'article_category_label',
    'articlePublishedLabel': 'article_published_label',
    'articleTagsLabel': 'article_tags_label',
    'errorLoadingArticleText': 'error_loading_articles', // Re-use error message

    // admin.html specific elements
    'adminPanelTitle': 'admin_panel_title',
    'createArticleHeading': 'create_article_heading',
    'articleTitleLabel': 'article_title_label',
    'articleDescriptionLabel': 'article_description_label',
    'articleContentLabel': 'article_content_label',
    'articleImageLabel': 'article_image_label',
    'saveArticleButton': 'save_article_button',
    'updateArticleButton': 'update_article_button',
    'cancelEditButton': 'cancel_edit_button',
    'manageArticlesHeading': 'manage_articles_heading',
    'adminSearchInput': 'search_placeholder', // Re-use search_placeholder key
    'adminSearchButton': 'articles_search_button', // Re-use search button label
    'loadingAdminArticlesText': 'loading_articles_text',
    'noAdminArticlesText': 'no_articles_found', // Re-use no articles found key
    'errorLoadingAdminArticlesText': 'error_loading_articles', // Re-use error message
    'errorLoadingArticleForEdit': 'error_loading_article_for_edit',
    'confirmDeleteArticle': 'confirm_delete_article',
    'articleDeletedSuccess': 'article_deleted_success',
    'errorDeletingArticle': 'error_deleting_article',
    'articleSavedSuccess': 'article_saved_success',
    'errorSavingArticle': 'error_saving_article'
};


// Function to load and apply translations
async function loadAndApplyTranslations(lang) {
    console.log(`Attempting to load translations for: ${lang}`);
    try {
        const response = await fetch(`/translations/${lang}.json`); // Path to your JSON files
        if (!response.ok) {
            console.warn(`Translation file for ${lang}.json not found or error. Falling back to English.`);
            if (lang !== 'en') {
                return loadAndApplyTranslations('en'); // Recursively call for English if current lang fails
            }
            throw new Error(`Failed to load translation for ${lang} and no English fallback available.`);
        }
        const translations = await response.json();
        console.log(`Translations loaded for ${lang}:`, translations);

        // Apply translations based on the translationMap
        for (const elementId in translationMap) {
            const element = document.getElementById(elementId);
            const translationKey = translationMap[elementId];

            if (element && translations[translationKey]) {
                // Handle different types of elements (e.g., input placeholders vs. textContent)
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[translationKey]);
                } else {
                    element.textContent = translations[translationKey];
                }
            }
        }
        // Save the chosen language to localStorage for persistence across sessions
        localStorage.setItem('selectedLanguage', lang);

        // Update active flag visual
        document.querySelectorAll('.language-flags .flag').forEach(flag => {
            if (flag.getAttribute('data-lang') === lang) {
                flag.classList.add('active-lang');
            } else {
                flag.classList.remove('active-lang');
            }
        });

    } catch (error) {
        console.error('Error loading or applying translations:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {

    // --- Existing JavaScript for Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            navLinks.classList.toggle('show');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('show') && window.innerWidth <= 1024) {
                    navLinks.classList.remove('show');
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('show') &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                navLinks.classList.remove('show');
            }
        });

        window.addEventListener('scroll', () => {
            if (navLinks.classList.contains('show') && window.innerWidth <= 1024) {
                navLinks.classList.remove('show');
            }
        });
    }

    // --- Header Search Functionality ---
    const headerSearchIcon = document.getElementById('headerSearchIcon');
    const headerSearchInput = document.getElementById('headerSearchInput');

    if (headerSearchIcon && headerSearchInput) {
        headerSearchIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            headerSearchInput.classList.toggle('active');
            if (headerSearchInput.classList.contains('active')) {
                headerSearchInput.focus();
            } else {
                headerSearchInput.value = '';
            }
        });

        headerSearchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const searchTerm = headerSearchInput.value.trim();
                if (searchTerm) {
                    window.location.href = `articles.html?q=${encodeURIComponent(searchTerm)}`;
                } else {
                    window.location.href = `articles.html`;
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (!headerSearchIcon.contains(event.target) && 
                !headerSearchInput.contains(event.target) &&
                !menuToggle.contains(event.target) && 
                !navLinks.contains(event.target)
            ) {
                headerSearchInput.classList.remove('active');
                headerSearchInput.value = ''; 
            }
        });
    }

    // --- Language Flag Functionality ---
    document.querySelectorAll('.language-flags .flag').forEach(flag => {
        flag.addEventListener('click', () => {
            const lang = flag.getAttribute('data-lang'); // Get language code from data-lang attribute
            if (lang) {
                loadAndApplyTranslations(lang);
            }
        });
    });

    // Load preferred language on initial page load
    const savedLang = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
    loadAndApplyTranslations(savedLang);
});
