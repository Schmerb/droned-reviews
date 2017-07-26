'use strict';

let state = {
    post: null
};
// Banner Nav
const BANNER_WRAP = '.banner-wrap';
const BURGER_ANCHOR = '.burger-anchor';
const BURGER_WRAP = '.burger-icon-wrap';
const BURGER_ICON = '#burger-icon';
const MOBILE_MENU = '.mobile-menu';
const MOBILE_MENU_ITEM = '.mobile-menu a';
const REVIEWS_NAV_ITEM = '.reviews';
const LOGIN_BTN = '.login';
const SIGNUP_BTN = '.signup';
// Login / Signup Modal
const LOGIN_SIGNUP_MODAL = '#login-signup';
const SIGNUP_FORM = '.signup-form';
const LOGIN_FORM = '.login-form';
const SIGNUP_SCREEN_BTN = '.signup-screen-btn';
const LOGIN_SCREEN_BTN = '.login-screen-btn';
const LOGIN_SIGNUP_X = '#login-signup-x';
// Write Review Form
const REVIEW_FORM_SCREEN = '#review-form-screen';
const REVIEW_FORM = '.review-form';
const CLOSE_BTN = '.close-btn';
const WRITE_REVIEW_NAV = '.write-review';
// Review Preview Screen
const PREVIEW_SCREEN = '#review-post-preview';
const PREVIEW_CONTENT = '.preview-content';
const PREVIEW_BTN = '.preview-btn';
const PREIVEW_CLOSE_BTN = '.preview-close-btn';
const INTERACTIONS = '.interactions';
// Review / Comments
const COMMENT_BTN = '.comment-btn';
const COMMENTS_CONTAINER = '.comments-container';
const EXPAND = '.expand';

const REVIEWS_CONTAINER = '#reviews-container';

let MOCK_REVIEW_DATA = [
    {
        author: "Mike Schmerbeck",
        make: "DJI",
        model: drones.dji.phantom_4.model,
        specs: drones.dji.phantom_4,
        title: "Title of this post!!",
        content: "The Phantom 4 has the perfect mix of professional grade equipment and easy to use in-flight controls. The camera itself is worthy of its own review. The P4 comes with a 4K camera mounted on a gimbal for extremely stable shots. Shoots 1080p video @120f/s which makes for the smoothest slow-motion playback. The intelligent flight modes allow for custom movement using gps for precision accuracy and with return-to-home mode, you never have to worry about not making it back to the take-off area since a series of warnings and auto-flight controls are triggered if battery power drops below a certain threshold. This is the ultimate quad-copter currently on the market and for the price, you get what you pay for!"
    },
    {
        author: "Max McClaskie",
        make: "DJI",
        model: drones.dji.phantom_4_pro.model,
        specs: drones.dji.phantom_4_pro,
        title: "Title of this post!!",
        content: "Vestibulum pulvinar quam odio, convallis ultrices dui volutpat id. Fusce eget sapien eget est maximus faucibus eget quis orci. Aliquam ultrices, diam sit amet sollicitudin vulputate, tortor velit posuere massa, id commodo tellus nunc sit amet metus. Nunc nisl erat, semper pellentesque augue nec, fermentum ultrices eros. Donec ac sem enim. Aenean porta eros eu felis molestie semper. Mauris consectetur ante a pharetra varius. Ut tincidunt enim eleifend ligula tempus, nec eleifend dui imperdiet. Proin ac auctor sapien. Vivamus aliquet efficitur consequat. Ut gravida arcu ac malesuada laoreet. Quisque ut dapibus leo. Sed molestie, risus vitae sollicitudin ultricies, velit ligula sodales mauris, vitae bibendum diam orci et libero. Sed suscipit eros eu sapien sodales, eget placerat lorem pulvinar. Etiam et sagittis nisl, eget mollis mi. Phasellus tristique odio et massa facilisis, dictum efficitur eros pellentesque."
    },
    {
        author: "John Digweed",
        make: "DJI",
        model: drones.dji.phantom_3_standard.model,
        specs: drones.dji.phantom_3_standard,
        title: "Title of this post!!",
        content: "Morbi consequat erat a mi sollicitudin posuere. Praesent quis hendrerit risus, id euismod justo. Nunc vel malesuada nisi. Suspendisse suscipit urna in luctus facilisis. Integer condimentum dui nunc, ac semper ex varius nec. Vestibulum scelerisque metus eu sem sollicitudin cursus. Curabitur non sapien nisl. Mauris a ultrices est, in accumsan elit. Sed pellentesque nisi consequat urna maximus finibus. Pellentesque interdum urna eu mollis rutrum. Cras vitae urna consequat, dapibus metus ac, sagittis elit. Cras tempus, lectus a dictum venenatis, massa libero eleifend felis, nec malesuada purus tellus et felis."
    },
    {
        author: "Claude VonStroke",
        make: "DJI",
        model: drones.dji.mavic_pro.model,
        specs: drones.dji.mavic_pro,
        title: "Title of this post!!",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a tortor sed erat maximus condimentum nec sed risus. Maecenas ut justo sapien. Nulla in condimentum dolor. Fusce pretium nibh magna, vel scelerisque erat rutrum vel. Quisque porttitor ultricies ex. In ac nisl vestibulum, luctus justo hendrerit, ultricies libero. Proin ut cursus enim, nec tempor libero. Nunc venenatis consequat erat id luctus. Vestibulum a urna semper libero molestie malesuada."
    },
    {
        author: "Bommer",
        make: "DJI",
        model: drones.dji.inspire_2_X4S.model,
        specs: drones.dji.inspire_2_X4S,
        title: "Title of this post!!",
        content: "Proin ut nunc at sapien sodales faucibus vitae sit amet magna. Donec vulputate diam id purus aliquet sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sodales tincidunt nisl, at elementum risus aliquet id. Donec iaculis, nibh et tincidunt eleifend, lorem metus efficitur turpis, sit amet luctus orci lectus vel sapien. Donec id est ullamcorper, consequat turpis non, eleifend nisi. Phasellus accumsan nulla et laoreet fringilla. Integer consectetur commodo augue sit amet consequat."
    },
];

function getAndDisplayReviews() {
    let reviews = MOCK_REVIEW_DATA.map((review) => {
        return formReviewPost(review);
    });
    $(REVIEWS_CONTAINER).html(reviews.join(''));
}

// 
// 
//
function formReviewPost(postData) {
    let $this = postData;
    let author = $this.author,
        make = $this.make,
        model = $this.model,
        title = $this.title,
        content = $this.content,
        specs = $this.specs;
    return  `<div class="review">
                <div class="details">
                    <h3>Model: <span class="model">${model}</span></h3>
                    <h5>Manufacturer: <span class="maker"><b>${make}</b></span></h5>
                    <dl class="specs">
                        <dt>Specs</dt>
                        <dd>Ave. Price: <span>$${specs.price}</span></dd>
                        <dd>Camera: <span>${specs.camera}</span></dd>
                        <dd>Max Flight Time: <span class="max-flight">${specs.max_flight_time}</span></dd>
                        <dd>Max Range: <span>${specs.max_range}</span></dd>
                        <dd>Max Speed: <span>${specs.max_speed}</span></dd>
                        <dd>GPS?: <span>${specs.gps}</span></dd>
                        <dd>3-axis gimbal: <span>${specs.gimbal}</span></dd>
                        <dd>Intelligent Flight: <span>${specs.intelligent_flight}</span></dd>
                        <dd>Avoidance: <span>${specs.avoidance}</span></dd>
                        <dd>Return Home: <span>${specs.return_home}</span></dd>
                        <dd>Follow-Me Mode: <span>${specs.follow_me_mode}</span></dd>
                        <dd>Tracking Mode: <span>${specs.tracking_mode}</span></dd>
                    </dl>
                </div>
                <div class="post">
                    <img class="post-img" src="../assets/phantom-4-annie-spratt.jpg">
                    <h2 class="post-title">${title}</h2>
                    <hr class="shadow-hr">
                    <p class="content" id="">${content}</p>
                    <label class="author-label" for="">By: <span class="author">${author}</span></label>
                    <hr class="shadow-hr comment-hr">
                    <div class="interactions">
                        <button class="upvote-btn" type="button">Up Vote</button>
                        <span>Votes: <span class="votes js-votes">0</span></span>
                        <button class="comment-btn" type="button">Comment</button>
                    </div>
                </div>
                ${commentTemplate()}
            </div>`;
}

function commentTemplate() {
    return `<div class="comments-container">
                <header class="comments-header">
                    <span class="js-comments-num">5</span> Comments
                    <i class="fa fa-comment-o" aria-hidden="true"></i>
                    <textarea class="comment-input" rows="" cols="" placeholder="Write comment here . . ."></textarea>
                </header>
                <hr class="shadow-hr">

                <div class="comment">
                    <p class="comment-content">Haec enim ipsa mihi sunt voluptati, et erant illa Torquatis. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. Qui autem esse poteris, nisi te amor ipse ceperit? Quae cum dixisset, finem ille. Ostendit pedes et pectus.</p>
                    <div class="comment-metadata">
                        <span class="date-posted">11/19/17 2:47 PM</span>
                        <span class="comment-user">- @schmerb</span>
                        <div class="thumbs">
                            <i class="like fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="dislike fa fa-thumbs-down" aria-hidden="true"></i>
                            <span class="like-dislikes">+1</span>
                        </div>
                        <button class="reply-btn" type="button">Reply</button>
                    </div>
                </div>
                <div class="comment">
                    <p class="comment-content">Haec enim ipsa mihi sunt voluptati, et erant illa Torquatis. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. Qui autem esse poteris, nisi te amor ipse ceperit? Quae cum dixisset, finem ille. Ostendit pedes et pectus.</p>
                    <div class="comment-metadata">
                        <span class="date-posted">11/19/17 2:47 PM</span>
                        <span class="comment-user">- @schmerb</span>
                        <div class="thumbs">
                            <i class="like fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="dislike fa fa-thumbs-down" aria-hidden="true"></i>
                            <span class="like-dislikes">+1</span>
                        </div>
                        <button class="reply-btn" type="button">Reply</button>
                    </div>
                </div>
                <div class="comment">
                    <p class="comment-content">Haec enim ipsa mihi sunt voluptati, et erant illa Torquatis. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. Qui autem esse poteris, nisi te amor ipse ceperit? Quae cum dixisset, finem ille. Ostendit pedes et pectus.</p>
                    <div class="comment-metadata">
                        <span class="date-posted">11/19/17 2:47 PM</span>
                        <span class="comment-user">- @schmerb</span>
                        <div class="thumbs">
                            <i class="like fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="dislike fa fa-thumbs-down" aria-hidden="true"></i>
                            <span class="like-dislikes">+1</span>
                        </div>
                        <button class="reply-btn" type="button">Reply</button>
                    </div>
                </div>
                <div class="comment">
                    <p class="comment-content">Haec enim ipsa mihi sunt voluptati, et erant illa Torquatis. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. Qui autem esse poteris, nisi te amor ipse ceperit? Quae cum dixisset, finem ille. Ostendit pedes et pectus.</p>
                    <div class="comment-metadata">
                        <span class="date-posted">11/19/17 2:47 PM</span>
                        <span class="comment-user">- @schmerb</span>
                        <div class="thumbs">
                            <i class="like fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="dislike fa fa-thumbs-down" aria-hidden="true"></i>
                            <span class="like-dislikes">+1</span>
                        </div>
                        <button class="reply-btn" type="button">Reply</button>
                    </div>
                </div>
                

            </div>`;
}


function openLoginSignupModal(screen) {
    show(LOGIN_SIGNUP_MODAL);
    screen === 'login' ? displayLoginForm() : displaySignupForm();
    $('body').addClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Login form to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayLoginForm() {
    $(LOGIN_SCREEN_BTN).addClass('active-btn');
    $(LOGIN_SCREEN_BTN).removeClass('inactive-btn');
    $(SIGNUP_SCREEN_BTN).addClass('inactive-btn');
    hide(SIGNUP_FORM);
    show(LOGIN_FORM);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Signup form to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySignupForm() {
    $(SIGNUP_SCREEN_BTN).removeClass('inactive-btn');
    $(SIGNUP_SCREEN_BTN).addClass('active-btn');
    $(LOGIN_SCREEN_BTN).addClass('inactive-btn');
    hide(LOGIN_FORM);
    show(SIGNUP_FORM);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Adds hidden class to all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hide() {
    Object.values(arguments).forEach((target) => {
        $(target).addClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Removes hidden class from all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function show() {
    Object.values(arguments).forEach((target) => {
        $(target).removeClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from form and formulates the review post
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function reviewFormHandler($form) {
    
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Formulates review post for preview before actually 
// submitting
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function previewReviewHandler() {
    let elements = $(REVIEW_FORM)[0].elements;
    let $selectedOpt = $(elements["drone-make"]).find(":selected");
    let droneMake = $selectedOpt.parent().attr('label');
    let droneModel = $selectedOpt[0].value;
    let droneData = getDroneData(droneMake, droneModel);
    let title = elements['title'].value;
    let content = elements['post-content'].value;
    let user = 'Mike Schmerb';
    let post = {user, droneData, title, content};
    
    let postData = {
        title,
        content,
        author: user,
        make: droneData.brand,
        model: droneData.model,
        specs: droneData,
    };

    let postHtml = formReviewPost(postData);
    $(REVIEWS_CONTAINER).append(postHtml);
    show(PREVIEW_SCREEN);
    $(PREVIEW_CONTENT).html(postHtml);
    $(PREVIEW_CONTENT).find(INTERACTIONS).remove();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Looks up and returns data object on given drone
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getDroneData(make, model) {
    make = make.toLowerCase();
    return drones[make][model];
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Populates drone dropdown selector with all current models
// stored in drones object. Now you only have to update one
// place in code to add new drone options to form
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fillDroneOptGroups() {
    $('#dropdown-options').empty();
    for (let make in drones) {
        let models = [];
        let displayMake;
        for (let model in drones[make]) {
            let specs = drones[make][model];
            displayMake === undefined ? displayMake = specs.brand : null;
            let option = `<option value="${model}">${specs.model}</option>`;
            models.push(option);
        }
        let optGroup = `<optgroup label="${displayMake}">
                            ${models.join('')}
                        </optgroup>`;
        $('#dropdown-options').append(optGroup);
    }
}


//================================================================================
// Utility functions
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target, duration = 1200, offset = 0) {
    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    $(document).ready(() => {
        checkSize();
        $(window).resize(checkSize);
    });
}

function checkSize() {
    (parseInt($("body").css('width')) <= '414') ? state.isMobile = true : state.isMobile = false;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fixes banner nav to top of screen on scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fixBannerNav() {
    $(window).scroll((e) => {
        let scroll = $(window).scrollTop();
        // console.log("Scroll Pos: ", scroll);
        if (scroll >= $('main').offset().top) {
            $(BANNER_WRAP).addClass('fixed-nav');
        } else {
            $(BANNER_WRAP).removeClass('fixed-nav');
        }
    });
}


//================================================================================
// API calls
//================================================================================



//================================================================================
// Event Listeners
//================================================================================
function burgerMenuClick() {
    $(BURGER_ANCHOR).on('click', (e) => {
        e.preventDefault();
        $(MOBILE_MENU).toggleClass('open');
        $(BURGER_WRAP).toggleClass('open');
        $(BURGER_ICON).toggleClass('open');
        $('body').toggleClass('no-scroll');
    });
}

function mobileMenuItemClick() {
    $(MOBILE_MENU_ITEM).on('click', (e) => {
        e.preventDefault();
        $(MOBILE_MENU).removeClass('open');
        $(BURGER_WRAP).removeClass('open');
        $(BURGER_ICON).removeClass('open');
        $('body').removeClass('no-scroll');
    });
}

function reviewsNavItemClick() {
    $(REVIEWS_NAV_ITEM).on('click', (e) => {
        e.preventDefault();
        smoothScroll('#reviews');
    });
}

function loginBtnClick() {
    $(LOGIN_BTN).on('click', (e) => {
        e.preventDefault();
        openLoginSignupModal('login');
    });
}

function signupBtnClick() {
    $(SIGNUP_BTN).on('click', (e) => {
        e.preventDefault();
        openLoginSignupModal('signup');
    });
}

function signupScreenClick() {
    $(SIGNUP_SCREEN_BTN).on('click', function (e)  {
        e.preventDefault();
        displaySignupForm();
    });
}

function loginScreenClick() {
    $(LOGIN_SCREEN_BTN).on('click', function (e)  {
        e.preventDefault();
        displayLoginForm();
    });
}

function signupLoginCloseClick() {
    $(window).on('click', (e) => {
        if(e.target === $(LOGIN_SIGNUP_MODAL)[0] || e.target === $(LOGIN_SIGNUP_X)[0]) {
            hide(LOGIN_SIGNUP_MODAL);
            $('body').removeClass('no-scroll');
        }
    });
}

function writeReviewNavClick() {
    $(WRITE_REVIEW_NAV).on('click', (e) => {
        e.preventDefault();
        show(REVIEW_FORM_SCREEN);
        $('body').addClass('no-scroll');
    });
}

function closeReviewFormClick() {
    $(CLOSE_BTN).on('click', (e) => {
        e.preventDefault();
        hide(REVIEW_FORM_SCREEN);
        $('body').removeClass('no-scroll');
    });
}

function reviewFormSubmit() {
    $(REVIEW_FORM).submit(function(e) {
        reviewFormHandler($(this));
    });
}

function previewBtnClick() {
    $(PREVIEW_BTN).on('click', function(e) {
        e.preventDefault();
        previewReviewHandler();
    });
}

function previewCloseBtnClick() {
    $(PREIVEW_CLOSE_BTN).on('click', (e) => {
        e.preventDefault();
        hide(PREVIEW_SCREEN);
    });
}

function commentBtnClick() {
    $('#reviews').on('click', COMMENT_BTN, function(e) {
        e.preventDefault();
        let $commentSection = $(this).parents('.review').find(COMMENTS_CONTAINER);
        $commentSection.toggleClass('expand');
    });
}

//================================================================================
// Event Listener Groups
//================================================================================
function navMenuClicks() {
    burgerMenuClick();
    mobileMenuItemClick();
    reviewsNavItemClick();
    loginBtnClick();
    signupBtnClick();
}

function signupLoginFormClicks() {
    signupScreenClick();
    loginScreenClick();
    signupLoginCloseClick();
}

function writeReviewFormClick() {
    writeReviewNavClick();
    previewBtnClick();
    previewCloseBtnClick();
    closeReviewFormClick();
    reviewFormSubmit();
}

function reviewClicks() {
    commentBtnClick();
}

function utils() {
    fixBannerNav();
    fillDroneOptGroups();
}

//================================================================================
// Entry point -- Main
//================================================================================
$(function() {
    utils();
    navMenuClicks();
    signupLoginFormClicks();
    writeReviewFormClick();
    reviewClicks();
    getAndDisplayReviews();
});