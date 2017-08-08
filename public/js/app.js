'use strict';

let state = {
    loggedIn: false,
    post: null    
};

// Banner Nav
const BANNER_WRAP = '.banner-wrap';
const BURGER_ANCHOR = '.burger-anchor';
const BURGER_WRAP = '.burger-icon-wrap';
const BURGER_ICON = '#burger-icon';
const MOBILE_MENU = '.mobile-menu';
const MOBILE_MENU_ITEM = '.mobile-menu li';
const REVIEWS_NAV_ITEM = '.reviews';
const LOGIN_BTN = '.login';
const SIGNUP_BTN = '.signup';
const LOGOUT_BTN = '.logout';
// Login / Signup Modal
const LOGIN_SIGNUP_PAGE = '#login-signup';
const LOGIN_SIGNUP_MODAL = '.login-signup-container';
const SIGNUP_FORM = '.signup-form';
const LOGIN_FORM = '.login-form';
const SIGNUP_SCREEN_BTN = '.signup-screen-btn';
const LOGIN_SCREEN_BTN = '.login-screen-btn';
const LOGIN_SIGNUP_X = '#login-signup-x';
const PASS_INPUT = '.pass-input';
// Write Review Form
const REVIEW_FORM_SCREEN = '#review-form-screen';
const REVIEW_FORM = '#review-form';
const CLOSE_BTN = '.close-btn';
const WRITE_REVIEW_NAV = '.write-review';
// Review Preview Screen
const PREVIEW_SCREEN = '#review-post-preview';
const PREVIEW_CONTENT = '.preview-content';
const PREVIEW_BTN = '.preview-btn';
const PREIVEW_CLOSE_BTN = '.preview-close-btn';
const INTERACTIONS = '.interactions';
// Review / Comments
const REVIEWS = '#reviews';
const REVIEW = '.review';
const COMMENTS_BTN = '.comments-btn';
const COMMENTS_CONTAINER = '.comments-container';
const COMMENT_BTN = '.comment-btn';
const COMMENTS_CONTENT = '.comments-content';
const COMMENT_FORM = '.comment-form';
const COMMENT_INPUT = '.comment-input';
const REPLY_COMMENT_FORM = '.reply-comment-form';
const REPLY_COMMENT_INPUT = '.reply-comment-input';
const REPLY_COMMENT_CONTENT = '.reply-comments-content';
const DETAILS = '.details';
const SPECS_BTN = '.specs-btn';
const EXPAND = '.expand';
const SUB_SIGNUP_BTN = '.sub-signup';
const SUB_LOGIN_BTN = '.sub-login';

const REVIEWS_CONTAINER = '#reviews-container';
const REVIEWS_CONTENT = '#reviews-content';
const UPVOTE_ARROW = '.up-vote-arrow';
const DOWNVOTE_ARROW = '.down-vote-arrow';
const VOTES = '.js-votes';
const LIKE = '.like';
const DISLIKE = '.dislike';
const LIKES = '.like-dislikes';
const POSNEG = '.posNeg';


let MOCK_REVIEW_DATA = [
    {
        author: {username: "Mike Schmerbeck"},
        drone: {
            make: "DJI",
            model: drones.dji.phantom_4.model   
        },
        img: drones.dji.phantom_4.img,
        specs: drones.dji.phantom_4,
        title: "Title of this post!!",
        content: "The Phantom 4 has the perfect mix of professional grade equipment and easy to use in-flight controls. The camera itself is worthy of its own review. The P4 comes with a 4K camera mounted on a gimbal for extremely stable shots. Shoots 1080p video @120f/s which makes for the smoothest slow-motion playback. The intelligent flight modes allow for custom movement using gps for precision accuracy and with return-to-home mode, you never have to worry about not making it back to the take-off area since a series of warnings and auto-flight controls are triggered if battery power drops below a certain threshold. This is the ultimate quad-copter currently on the market and for the price, you get what you pay for!"
    },
    {
        author: {username: "Max McClaskie"},
        drone: {
            make: "DJI",
            model: drones.dji.phantom_4_pro.model
        },
        img: drones.dji.phantom_4_pro.img,
        specs: drones.dji.phantom_4_pro,
        title: "Title of this post!!",
        content: "Vestibulum pulvinar quam odio, convallis ultrices dui volutpat id. Fusce eget sapien eget est maximus faucibus eget quis orci. Aliquam ultrices, diam sit amet sollicitudin vulputate, tortor velit posuere massa, id commodo tellus nunc sit amet metus. Nunc nisl erat, semper pellentesque augue nec, fermentum ultrices eros. Donec ac sem enim. Aenean porta eros eu felis molestie semper. Mauris consectetur ante a pharetra varius. Ut tincidunt enim eleifend ligula tempus, nec eleifend dui imperdiet. Proin ac auctor sapien. Vivamus aliquet efficitur consequat. Ut gravida arcu ac malesuada laoreet. Quisque ut dapibus leo. Sed molestie, risus vitae sollicitudin ultricies, velit ligula sodales mauris, vitae bibendum diam orci et libero. Sed suscipit eros eu sapien sodales, eget placerat lorem pulvinar. Etiam et sagittis nisl, eget mollis mi. Phasellus tristique odio et massa facilisis, dictum efficitur eros pellentesque."
    },
    {
        author: {username: "John Digweed"},
        drone: {
            make: "DJI",
            model: drones.dji.phantom_3_standard.model
        },
        img: drones.dji.phantom_3_standard.img,
        specs: drones.dji.phantom_3_standard,
        title: "Title of this post!!",
        content: "Morbi consequat erat a mi sollicitudin posuere. Praesent quis hendrerit risus, id euismod justo. Nunc vel malesuada nisi. Suspendisse suscipit urna in luctus facilisis. Integer condimentum dui nunc, ac semper ex varius nec. Vestibulum scelerisque metus eu sem sollicitudin cursus. Curabitur non sapien nisl. Mauris a ultrices est, in accumsan elit. Sed pellentesque nisi consequat urna maximus finibus. Pellentesque interdum urna eu mollis rutrum. Cras vitae urna consequat, dapibus metus ac, sagittis elit. Cras tempus, lectus a dictum venenatis, massa libero eleifend felis, nec malesuada purus tellus et felis."
    },
    {
        author: {username: "Claude VonStroke"},
        drone: {
            make: "DJI",
            model: drones.dji.mavic_pro.model
        },
        img: drones.dji.mavic_pro.img,
        specs: drones.dji.mavic_pro,
        title: "Title of this post!!",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a tortor sed erat maximus condimentum nec sed risus. Maecenas ut justo sapien. Nulla in condimentum dolor. Fusce pretium nibh magna, vel scelerisque erat rutrum vel. Quisque porttitor ultricies ex. In ac nisl vestibulum, luctus justo hendrerit, ultricies libero. Proin ut cursus enim, nec tempor libero. Nunc venenatis consequat erat id luctus. Vestibulum a urna semper libero molestie malesuada."
    },
    {
        author: {username: "Bommer"},
        drone: {
            make: "DJI",
            model: drones.dji.inspire_2_X4S.model
        },
        img: drones.dji.inspire_2_X4S.img,
        specs: drones.dji.inspire_2_X4S,
        title: "Title of this post!!",
        content: "Proin ut nunc at sapien sodales faucibus vitae sit amet magna. Donec vulputate diam id purus aliquet sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sodales tincidunt nisl, at elementum risus aliquet id. Donec iaculis, nibh et tincidunt eleifend, lorem metus efficitur turpis, sit amet luctus orci lectus vel sapien. Donec id est ullamcorper, consequat turpis non, eleifend nisi. Phasellus accumsan nulla et laoreet fringilla. Integer consectetur commodo augue sit amet consequat."
    },
];

function getAndDisplayReviews() {
    let reviews = MOCK_REVIEW_DATA.map((review) => {
        return formReviewPost(review);
    });
    $(REVIEWS_CONTENT).append(reviews.join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays current posts in db to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPosts(_posts) {
    let posts = _posts.map((post) => {
        let specs = getDroneData(post.drone.make, post.drone.model);
        Object.assign(post, {specs});
        return formReviewPost(post); 
    });
    // Need to append when fetching batch at a time
    $(REVIEWS_CONTENT).html(posts.join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Updates DOM with current comment without requiring
// page refresh
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayComment(comment) {

    if ('postId' in comment) {
        // Main comments
        let postId = comment.postId;
        let commentHtml = getCommentTemplate(comment);
        $(`${COMMENTS_CONTENT}[data-post-id="${postId}"]`).append(commentHtml);
    } else {
        // Reply comments
        let commentId = comment.commentId;
        let commentHtml = getReplyCommentTemplate(comment);
        $(`.reply-comments-content[data-comment-id=${commentId}]`).append(commentHtml);
    }
}



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated review post template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function formReviewPost(postData) {
    let $this = postData;
    // console.log("this obj", $this);
    let id = $this.id,
        author = $this.author.username,
        make = $this.drone.make,
        model = $this.drone.model,
        title = $this.title,
        content = $this.content,
        specs = $this.specs,
        img_src = specs.img,
        votes = $this.votes || 0;
        let posNeg = '';
        if (votes < 0)
            posNeg = '&#45;';
        else if (votes > 0)
            posNeg = '+';
    let review  =   `<div class="review">
                        <div class="post" data-post-id="${id}">
                            <div class="img-container">
                                <img class="post-img" src="${img_src}">
                                <h3>Model: <span class="model">${model}</span></h3>
                                <h5>Manufacturer: <span class="maker"><b>${make}</b></span></h5>
                            </div>
                            <h2 class="post-title">${title}</h2>
                            <hr class="shadow-hr">
                            <div class="vote-aside">
                                <div class="arrow-wrap">
                                    <i class="up-vote-arrow fa fa-arrow-up" aria-hidden="true"></i>
                                    <span class="posNeg">${posNeg}</span><span class="js-votes">${votes}</span>
                                    <i class="down-vote-arrow fa fa-arrow-down" aria-hidden="true"></i>
                                </div>
                            </div>
                            <p class="content">${content}</p>
                            <label class="author-label" for="">By: <span class="author">${author}</span></label>
                            
                            <div class="mobile-vote-aside">
                                <i class="up-vote-arrow fa fa-arrow-up" aria-hidden="true"></i>
                                <span class="posNeg">${posNeg}</span><span class="votes js-votes">${votes}</span>
                                <i class="down-vote-arrow fa fa-arrow-down" aria-hidden="true"></i>
                            </div>
                            <div class="interactions">
                                <button class="specs-btn" type="button">
                                    Specs
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                                <button class="comments-btn" type="button">
                                    Comments
                                    <i class="fa fa-comment-o" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
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
                        <div class="comments-container">
                            <header class="comments-header">
                                <span class="js-comments-num">5</span> Comments
                                <i class="fa fa-comment-o" aria-hidden="true"></i>
                            </header>
                            <div class="comments-content" data-post-id="${id}">

                            </div>
                            <hr class="shadow-hr">`;
            if (state.loggedIn) { // Logged in, comment form displayed
                review +=   `<form class="comment-form" method="post" action="/posts/comments">
                                <textarea class="comment-input" rows="" cols="" placeholder="Write comment here . . ." required></textarea>
                                <button class="comment-btn" type="submit">Comment</button>
                            </form>`;
            } else { // Not logged in, message to log in to write comment
                review +=  `<div class="login-message-container">
                                <p class="login-message">Must be logged in to write a comment.</p>
                                <ul class="comment-nav">
                                    <li><a href="#" class="sub-login">LogIn</a></li>
                                    <li><a href="#" class="sub-signup">Sign Up</a></li>
                                </ul>
                            </div>`;
            }                
            // close review <div>'s            
            review +=     `</div>
                    </div>
                    <hr>`;
    return review;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getCommentTemplate(comment) {
    let content = comment.content,
        username = comment.author.username,
        created = new Date(comment.created).toDateString(),
        likes = comment.likes,
        postId = comment.postId,
        id = comment.id;
    let posNeg = '';
    if (likes < 0)
        posNeg = '&#45;';
    else if (likes > 0)
        posNeg = '+';
    
    let commentTemp =  
                `<div class="comment gen-comment" id="_${id}" data-post-id="${postId}" data-this-id="${id}">
                    <p class="comment-content">${content}</p>
                    <div class="comment-metadata">
                        <span class="date-posted">${created}</span>
                        <span class="comment-user">- @${username}</span>
                        <div class="thumbs">
                            <i class="like fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="dislike fa fa-thumbs-down" aria-hidden="true"></i>
                            <span class="posNeg">${posNeg}</span><span class="like-dislikes">${likes}</span>
                        </div>
                        <label class="reply-c-btn-label" for="">
                            <span>comments</span>
                            <button class="expand-reply-comments-btn" type="button"></button>
                        </label>
                    </div>
                    <div class="reply-comments-container">
                        
                        <div class="reply-comments-content" data-comment-id="${id}">
                            
                        </div>`;
                        // <hr class="shadow-hr">`;
    if (state.loggedIn) { // Logged in, reply comment form displayed
        commentTemp +=  `<form class="reply-comment-form comment-form expand" method="POST" action="/posts/comments">
                            <textarea class="reply-comment-input comment-input" rows="" cols="" placeholder="Type your reply here . . ." required></textarea>
                             <button class="reply-comment-btn" type="submit">Reply</button>
                        </form>`;
    } 
    // close comment <div>'s  
    commentTemp +=  `</div>
                 </div>`; 
    return commentTemp;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated reply comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getReplyCommentTemplate(comment) {
    let content = comment.content,
        username = comment.author.username,
        created = new Date(comment.created).toDateString(),
        likes = comment.likes,
        commentId = comment.commentId,
        id = comment._id;
    let posNeg = '';
    if (likes < 0)
        posNeg = '&#45;';
    else if (likes > 0)
        posNeg = '+';
    return `<hr class="thin-hr">
            <div class="reply-comment" data-this-id="${id}">
                <p class="reply-comment-content gen-comment">${content}</p>
                <div class="reply-comment-metadata">
                    <span class="date-posted">${created}</span>
                    <span class="comment-user">- @${username}</span>
                    <div class="thumbs">
                        <i class="like fa fa-thumbs-up" aria-hidden="true"></i>
                        <i class="dislike fa fa-thumbs-down" aria-hidden="true"></i>
                        <span class="posNeg">${posNeg}</span><span class="like-dislikes">${likes}</span>
                    </div>
                </div>
            </div>`;
}


function openLoginSignupModal(screen) {
    show(LOGIN_SIGNUP_PAGE);
    $(LOGIN_SIGNUP_PAGE).addClass('slide');
    $(LOGIN_SIGNUP_MODAL).addClass('slide');
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
// Collects user signup data and submits it to server
// to create a new user
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function signupFormHandler($form) {
    let email = $form.find('.email-input').val(),
        username = $form.find('.username-input').val(),
        password = $form.find(PASS_INPUT).val(),
        rePassword = $form.find('.re-pass-input').val();
    if (password !== rePassword) {
        alert('passwords did not match.');
        $('.signup-form ' + PASS_INPUT).addClass('error');
    } else {
        $('.signup-form ' + PASS_INPUT).removeClass('error');
        let data = {email, username, password};
        createNewUser(data); // makes call to api
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects username and password from user and 
// calls ajax function to attempt to log user in to session
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function loginFormHandler($form) {
    let username = $form.find('.username-input').val(),
        password = $form.find(PASS_INPUT).val();
    let data = {username, password};
    logUserIn(data); // makes call to api
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function reviewFormHandler($form) {
    let url = $form.attr('action'),
        $selectedOpt = $('#dropdown-options').find(":selected"),
        make = $selectedOpt.parent().attr('label').toLowerCase(),
        model = $selectedOpt[0].value,
        title = $('#title-input').val(),
        content = $('#post-content').val(),
        rating = $('input[name=star]:checked').val(),
        username = 'Schmerb';
    
    let post = {
        url,
        drone: {make, model}, 
        title, 
        content, 
        rating, 
        author: {username}
    };
    
    // ajax POST request to db
    createPost(post);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from comment form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function commentFormHandler($form) {
    let url = $form.attr('action'),
        content = $form.find('.comment-input').val(),
        postId = $form.siblings(COMMENTS_CONTENT).attr('data-post-id'),
        username = 'Schmerb';
    let comment = {
        url,
        content,
        author: {username}
    }
    if ($form.hasClass('reply-comment-form')) {
        comment['commentId'] = $form.closest('.comment').attr('data-this-id');
    } else if(postId !== undefined) {
        comment.postId = postId;
    }
    // call to ajax POST method
    postComment(comment);
    // reset form after submit
    $form[0].reset()
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Formulates review post for preview before actually 
// submitting
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function previewReviewHandler() {
    let elements = $(REVIEW_FORM)[0].elements;
    let $selectedOpt = $(elements["make"]).find(":selected");
    let droneMake = $selectedOpt.parent().attr('label');
    let droneModel = $selectedOpt[0].value;
    let droneData = getDroneData(droneMake, droneModel);
    let title = elements['title'].value;
    let content = elements['content'].value;
    let user = 'Mike Schmerb';
    let post = {user, droneData, title, content};
    
    let postData = {
        title,
        content,
        author: user,
        img: droneData.img,
        drone: {
            make: droneData.brand,
            model: droneData.model
        },
        specs: droneData,
    };

    let postHtml = formReviewPost(postData);
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) comments for given post
// and hides Specs if open
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleComments(commentsBtn) {
    let $review = $(commentsBtn).parents(REVIEW);
    let $commentSection = $review.find(COMMENTS_CONTAINER);
    let $details = $review.find(DETAILS);
    let $specs_btn = $review.find(SPECS_BTN);
    $details.removeClass('expand');
    $specs_btn.removeClass('btn-active');
    $commentSection.toggleClass('expand');
    $(commentsBtn).toggleClass('btn-active');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) specs for given post
// and hides comments if open
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleSpecs(specBtn) {
    let $review = $(specBtn).parents(REVIEW);
    let $details = $review.find(DETAILS);
    let $commentSection = $review.find(COMMENTS_CONTAINER);
    let $commentS_btn = $review.find(COMMENTS_BTN);
    $commentSection.removeClass('expand');
    $commentS_btn.removeClass('btn-active');
    $details.toggleClass('expand');
    $(specBtn).toggleClass('btn-active');
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Bundles comments and displays them in
// the associated post's comment section
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function commentsFromDbHandler(comments, mainComments = true, id) {
    if (mainComments) {
        let postId = comments[0].postId;
        let commentsHtml = comments.map((comment) => { 
            return getCommentTemplate(comment);
        });
        // Find comments-content by data-id and append 
        $(`${COMMENTS_CONTENT}[data-post-id="${postId}"]`).append(commentsHtml.join(''));

        // Make additional calls to db to fetch each reply comment
        comments.forEach((comment) => {
            getCommentsFromDb(comment.id, false);
        });
    } else {
        let commentId = id;
        let commentsHtml = comments.map((comment) => { 
            return getReplyCommentTemplate(comment);
        });

        $(`${REPLY_COMMENT_CONTENT}[data-comment-id="${commentId}"]`).append(commentsHtml.join(''));
    }
}

//================================================================================
// API handlers 
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays posts to screen and makes call for each
// post's comments
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function postsHandler(posts) {

    displayPosts(posts);
    // Make call to api to get comments for each post
    posts.forEach((post) => {
        getCommentsFromDb(post.id);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function voteOnPost($voteBtn, upVote = true) {
    let $votes = $voteBtn.siblings(VOTES);
    let $posNeg = $voteBtn.siblings(POSNEG);
    let count = parseInt($votes.text());
    let postId = $voteBtn.closest('.post').attr('data-post-id');
    
    upVote ? ++count : --count;

    let posNeg = '';
    if (count < 0)
        posNeg = '&#45;';
    else if (count > 0)
        posNeg = '+';

    $posNeg.html(posNeg);
    $votes.text(count);
    updatePost({
        id: postId,
        votes: count
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function likeDislikeComment($btn, like = true) {
    let $likes = $btn.siblings(LIKES);
    let $posNeg = $btn.siblings(POSNEG);
    let count = parseInt($likes.text());
    let commentId = $btn.closest('.gen-comment').attr('data-this-id');
    like ? ++count : --count;
    let posNeg = '';
    if (count < 0)
        posNeg = '&#45;';
    else if (count > 0)
        posNeg = '+';

    $posNeg.html(posNeg);
    $likes.text(count);
    updateComment({
        id: commentId,
        likes: count
    });
}



//================================================================================
// API calls
//================================================================================

function getPostsFromDb() {
    $.ajax({
        url: "/posts",
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            postsHandler(res.posts);
        }
    });
}

function getCommentsFromDb(id, mainComments = true) {
    let url;
    if (mainComments) {
        url = `/posts/${id}/comments`;
    } else {
        url = `/posts/comments/${id}/comments`;
    }
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            if (res.comments.length > 0) {
                               //  Main comment                //  Reply comment
                mainComments ? commentsFromDbHandler(res.comments) : commentsFromDbHandler(res.comments, false, id)
            }
        }
    });
}

function createNewUser(userData) {
    $.ajax({
        url: '/users',
        type: 'POST',
        dataType: 'json',
        data: userData,
        success: (res) => {
            // Successfully signed user up, now log them in
            logUserIn({
                username: res.username,
                password: res.password
            });
        }
    });
}

function logUserIn(loginData) {
    // console.log(loginData);
    $.ajax({
        url: '/users/login',
        type: 'POST',
        dataType: 'json',
        beforeSend: function(xhr) {
            // Send basic auth, uri-encoded header with request
            xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(loginData.username + ':' + loginData.password))));
        },
        success: (res) => {
            location.reload();
        }
    });
}

function logUserOut() {
    $.ajax({
        url: 'users/logout',
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            location.reload();
        }
    });
}

function createPost(postData) {
     $.ajax({
        url: `/posts`,
        type: 'POST',
        dataType: 'json',
        data: postData,
        success: res => {
            console.log('Success');
            location.reload();
        }
    });
}

function updatePost(updateData) {
    let id = updateData.id;
    $.ajax({
        url: `/posts/${id}`,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: res => {
            console.log('Success');
        }
    });
}

function postComment(commentObj) {
    $.ajax({
        url: "/posts/comments",
        type: 'POST',
        dataType: 'json',
        data: commentObj,
        success: displayComment
    });
}

function updateComment(updateData) {
    let id = updateData.id;
    $.ajax({
        url: `/posts/comments/${id}`,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: res => {
            console.log('Success');
        }
    });
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

//
// Login modal btn
//
function loginBtnsClick() {
    // main nav login-btn
    $(LOGIN_BTN).on('click', (e) => {
        e.preventDefault();
        openLoginSignupModal('login');
        $(MOBILE_MENU).removeClass('open');
        $(BURGER_WRAP).removeClass('open');
        $(BURGER_ICON).removeClass('open');
        $('body').addClass('no-scroll');
    });
    // comments login-btn
    $(REVIEWS).on('click', SUB_LOGIN_BTN, (e) => {
        e.preventDefault();
        openLoginSignupModal('login');
        $(MOBILE_MENU).removeClass('open');
        $(BURGER_WRAP).removeClass('open');
        $(BURGER_ICON).removeClass('open');
        $('body').addClass('no-scroll');
    });
}

//
// Login form SUBMIT
//
function loginFormSubmit() {
    $(LOGIN_FORM).on('submit', function(e) {
        e.preventDefault();
        loginFormHandler($(this));
    });
}

//
// Signup modal btn
//
function signupBtnsClick() {
    // main nav signup-btn
    $(SIGNUP_BTN).on('click', (e) => {
        e.preventDefault();
        openLoginSignupModal('signup');
        $(MOBILE_MENU).removeClass('open');
        $(BURGER_WRAP).removeClass('open');
        $(BURGER_ICON).removeClass('open');
        $('body').addClass('no-scroll');
    });
    // comments signup-btn
    $(REVIEWS).on('click', SUB_SIGNUP_BTN, (e) => {
        e.preventDefault();
        openLoginSignupModal('signup');
        $(MOBILE_MENU).removeClass('open');
        $(BURGER_WRAP).removeClass('open');
        $(BURGER_ICON).removeClass('open');
        $('body').addClass('no-scroll');
    });
}

//
// Signup form SUBMIT
//
function signupFormSubmit() {
    $(SIGNUP_FORM).on('submit', function(e) {
        e.preventDefault();
        signupFormHandler($(this));
    });
}

//
// Logout btn
//
function logOutBtnClick() {
    $(LOGOUT_BTN).on('click', (e) => {
        e.preventDefault();
        logUserOut();
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
        if(e.target === $(LOGIN_SIGNUP_PAGE)[0] || e.target === $(LOGIN_SIGNUP_X)[0]) {
            $(LOGIN_SIGNUP_MODAL).removeClass('slide');
            $(LOGIN_SIGNUP_PAGE).removeClass('slide');
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

// 
// Review form SUBMIT
//
function reviewFormSubmit() {
    $(REVIEW_FORM).submit(function(e) {
        e.preventDefault();
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
    $(REVIEWS).on('click', COMMENTS_BTN, function(e) {
        e.preventDefault();
        toggleComments($(this));
    });
}

// 
// Post Votes 
//
function upVoteClick() {
    $(REVIEWS).on('click', UPVOTE_ARROW, function(e) {
        e.preventDefault();
        if (state.loggedIn) 
            voteOnPost($(this));
        else
           console.log('Must be logged in');
    });
}

function downVoteClick() {
    $(REVIEWS).on('click', DOWNVOTE_ARROW, function(e) {
        e.preventDefault();
        if (state.loggedIn) 
            voteOnPost($(this), false);
        else
            console.log('Must be logged in');
    });
}

// 
// Comment Likes
//
function commentLikeClick() {
    $(REVIEWS).on('click', LIKE, function(e) {
        e.preventDefault();
        if (state.loggedIn) 
            likeDislikeComment($(this));
        else
           console.log('Must be logged in');
    });
}

function commentDislikeClick() {
    $(REVIEWS).on('click', DISLIKE, function(e) {
        e.preventDefault();
        if (state.loggedIn) 
            likeDislikeComment($(this), false);
        else
           console.log('Must be logged in');
    });
}

// 
// Comment form SUBMIT
//
function commentFormSubmit() {
    $(REVIEWS).on('submit', COMMENT_FORM, function(e) {
        e.preventDefault();
        if (state.loggedIn) 
            commentFormHandler($(this));
        else
           console.log('Must be logged in');
    })
}

function replyCommentFormSubmit() {
    $(REVIEWS).on('submit', REPLY_COMMENT_FORM, function(e) {
        e.preventDefault();
        if (state.loggedIn) 
            commentFormHandler($(this));
        else
           console.log('Must be logged in');
    });
}

function replyCommentsArrowClick() {
    $(REVIEWS).on('click', '.expand-reply-comments-btn', function(e) {
        e.preventDefault();
        $(this).closest('.comment')
               .find('.reply-comments-container')
               .toggleClass('expand');
        $(this).toggleClass('open');
    });
}

function specsBtnClick() {
    $(REVIEWS).on('click', SPECS_BTN, function(e) {
        e.preventDefault();
        toggleSpecs($(this));
    });
}


//================================================================================
// Event Listener Groups
//================================================================================
function navMenuClicks() {
    burgerMenuClick();
    mobileMenuItemClick();
    reviewsNavItemClick();
    loginBtnsClick();
    signupBtnsClick();
    logOutBtnClick();
}

function signupLoginFormClicks() {
    signupScreenClick();
    loginScreenClick();
    signupLoginCloseClick();
    signupFormSubmit();
    loginFormSubmit();
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
    specsBtnClick();
    commentFormSubmit();
    upVoteClick();
    downVoteClick();
    commentLikeClick();
    commentDislikeClick();
    replyCommentsArrowClick();
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
    // getAndDisplayReviews();

    getPostsFromDb();
});