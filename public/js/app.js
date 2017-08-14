'use strict';

let state = {
    loggedIn: false,
    user: ''
};

// Banner Nav
const BANNER_WRAP      = '.banner-wrap';
const BURGER_ANCHOR    = '.burger-anchor';
const BURGER_WRAP      = '.burger-icon-wrap';
const BURGER_ICON      = '#burger-icon';
const MOBILE_MENU      = '.mobile-menu';
const MOBILE_MENU_ITEM = '.mobile-menu li';
const REVIEWS_NAV_ITEM = '.reviews';
const LOGIN_BTN        = '.login';
const SIGNUP_BTN       = '.signup';
const LOGOUT_BTN       = '.logout';
// Login / Signup Modal
const LOGIN_SIGNUP_PAGE  = '#login-signup';
const LOGIN_SIGNUP_MODAL = '.login-signup-container';
const SIGNUP_FORM        = '.signup-form';
const LOGIN_FORM         = '.login-form';
const SIGNUP_SCREEN_BTN  = '.signup-screen-btn';
const LOGIN_SCREEN_BTN   = '.login-screen-btn';
const LOGIN_SIGNUP_X     = '#login-signup-x';
const PASS_INPUT         = '.pass-input';
const EMAIL_INPUT        = '.email-input';
const USERNAME_INPUT     = '.username-input';
const SIGNUP_ERROR       = '.signup-error';
const LOGIN_ERROR        = '.login-error';
// Write Review Form
const REVIEW_FORM_SCREEN      = '#review-form-screen';
const EDIT_REVIEW_FORM_SCREEN = '#edit-review-form-screen';
const REVIEW_FORM             = '#review-form';
const EDIT_REVIEW_FORM        = '#edit-review-form';
const CLOSE_BTN               = '.close-btn';
const WRITE_REVIEW_NAV        = '.write-review';
const DELETE_POST_MODAL_BTN   = '.delete-post-modal-btn';
const DELETE_POST_MODAL       = '.delete-confirm-modal';
const DELETE_POST_BTN         = '.delete-post-btn';
const GO_BACK_BTN             = '.go-back-btn';
// Review Preview Screen
const PREVIEW_SCREEN    = '#review-post-preview';
const PREVIEW_CONTENT   = '.preview-content';
const PREVIEW_BTN       = '.preview-btn';
const PREIVEW_CLOSE_BTN = '.preview-close-btn';
const INTERACTIONS      = '.interactions';
// Drone carousel
const DRONE_SLIDER = '.drone-slider';
// Aside Filter
const ASIDE_BTN       = '.aside-slide-btn';
const ASIDE_CONTAINER = '.aside-container';
const FILTER_FORM     = '#radio-filter-form';
const FILTER_ALERT    = '.filter-alert';
const FILTER_BTN      = '.filter-btn';
const CLEAR_BTN       = '.clear-btn';
// Review 
const REVIEWS           = '#reviews';
const REVIEWS_CONTAINER = '#reviews-container';
const REVIEWS_CONTENT   = '#reviews-content';
const REVIEW            = '.review';
const DETAILS           = '.details';
const SPECS_BTN         = '.specs-btn';
const EXPAND            = '.expand';
// 
const UPVOTE_ARROW   = '.up-vote-arrow';
const DOWNVOTE_ARROW = '.down-vote-arrow';
const VOTES          = '.js-votes';
const LIKE           = '.like';
const DISLIKE        = '.dislike';
const LIKES          = '.like-dislikes';
const POSNEG         = '.posNeg';
const EDIT_POST_ICON = '#edit-post-icon';
// Comments
const COMMENTS_BTN       = '.comments-btn';
const COMMENTS_CONTAINER = '.comments-container';
const COMMENT_BTN        = '.comment-btn';
const COMMENTS_CONTENT   = '.comments-content';
const COMMENT_FORM       = '.comment-form';
const COMMENT_INPUT      = '.comment-input';
const NUM_COMMENTS       = '.js-comments-num';
// reply comments
const REPLY_COMMENT_FORM       = '.reply-comment-form';
const REPLY_COMMENT_INPUT      = '.reply-comment-input';
const REPLY_COMMENT_CONTENT    = '.reply-comments-content';
const SHOW_REPLY_COMMENTS_TXT  = '.show-reply-comments-txt';
const CLOSE_REPLY_COMMENTS_TXT = '.close-reply-comments-txt';
const SUB_SIGNUP_BTN           = '.sub-signup';
const SUB_LOGIN_BTN            = '.sub-login';




let MOCK_REVIEW_DATA = [
    {
        author: { username: "Mike Schmerbeck" },
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
        author: { username: "Max McClaskie" },
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
        author: { username: "John Digweed" },
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
        author: { username: "Claude VonStroke" },
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
        author: { username: "Bommer" },
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Get and Display mock data
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getAndDisplayReviews() {
    let reviews = MOCK_REVIEW_DATA.map((review) => {
        return formReviewPost(review);
    });
    $(REVIEWS_CONTENT).append(reviews.join(''));
}




// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated review post template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function formReviewPost(postData, byThisUser = false, userVoted) {
    let $this = postData;

    let id      = $this.id,
        author  = $this.author.username || state.user, // If username isnt attached to post, this is new post & attach current session user
        make    = $this.specs.brand,
        model   = $this.specs.model,
        title   = $this.title,
        content = $this.content,
        specs   = $this.specs,
        img_src = specs.img,
        votes   = $this.votes || 0,
        created = getElapsedTime(new Date($this.created));
    
    content = content.map((paragraph) => {
        return `<p class="paragraph">${paragraph}</p>`;
    });

    // console.log(content);
    // console.log(content.join(''));

    let posNeg  = '';
    if (votes < 0)
        posNeg = '&#45;';
    else if (votes > 0)
        posNeg = '+';
    // console.log({userVoted});
    // console.log(`postData: ${postData}`);
    let review = `<div class="review">
                        <div class="post" data-post-id="${id}">
                            <div class="img-container">
                                <img class="post-img" src="${img_src}">
                                <h3>Model: <span class="model">${model}</span></h3>
                                <h5>Manufacturer: <b><span class="maker">${make}</span></b></h5>
                            </div>
                            <h2 class="post-title">${title}</h2>
                            <hr class="shadow-hr">
                            <div class="vote-aside">
                                <div class="arrow-wrap">
                                    <i class="up-vote-arrow fa fa-arrow-up" aria-hidden="true" data-user-voted="${userVoted}"></i>
                                    <span class="posNeg">${posNeg}</span><span class="js-votes">${votes}</span>
                                    <i class="down-vote-arrow fa fa-arrow-down" aria-hidden="true" data-user-voted="${userVoted}"></i>
                                </div>
                            </div>
                            <div class="content">
                                ${content.join('')}
                            </div>
                            <div class="post-attr">
                                
                                <div class="c-date-edit-wrap">
                                    <span class="date-posted">submitted  ${created} ${/\d/.test(created) ? 'ago' : ''} by</span> <label class="author-label" for=""><span class="author">${author}</span></label>
                                    ${byThisUser ? '<i id="edit-post-icon" class="fa fa-pencil-square-o" aria-hidden="true"></i>' : ''} 
                                </div>
                            </div>

                            <div class="mobile-vote-aside">
                                <i class="up-vote-arrow fa fa-arrow-up" data-user-voted="${userVoted}" aria-hidden="true"></i>
                                <span class="posNeg">${posNeg}</span><span class="votes js-votes">${votes}</span>
                                <i class="down-vote-arrow fa fa-arrow-down" data-user-voted="${userVoted}" aria-hidden="true"></i>
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
                                <span class="js-comments-num">0</span> Comments
                                <i class="fa fa-comment-o" aria-hidden="true"></i>
                            </header>
                            <div class="comments-content" data-post-id="${id}">

                            </div>
                            <hr class="shadow-hr">`;
    if (state.loggedIn) { // Logged in, comment form displayed
        review +=           `<form class="comment-form" method="post" action="/posts/comments">
                                <textarea class="comment-input" rows="" cols="" placeholder="Write comment here . . ." required></textarea>
                                <button class="comment-btn" type="submit">Comment</button>
                            </form>`;
    } else { // Not logged in, message to log in to write comment
        review +=           `<div class="login-message-container">
                                <p class="login-message">Must be logged in to write a comment.</p>
                                <ul class="comment-nav">
                                    <li><a href="#" class="sub-login">LogIn</a></li>
                                    <li><a href="#" class="sub-signup">Sign Up</a></li>
                                </ul>
                            </div>`;
    }
    // close review <div>'s            
    review +=           `</div>
                    </div>
                    <hr class="post-hr">`;
    return review;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getCommentTemplate(comment, byThisUser, didUserLike) {
    let content  = comment.content,
        username = comment.author.username,
        created  = getElapsedTime(new Date(comment.created)),
        likes    = comment.likes,
        postId   = comment.postId,
        id       = comment.id;
    let posNeg = '';
    if (likes < 0)
        posNeg = '&#45;';
    else if (likes > 0)
        posNeg = '+';

    let commentTemp =
        `<div class="comment gen-comment" id="_${id}" data-post-id="${postId}" data-this-id="${id}">
                    <p class="comment-content">${content}</p>
                    <div class="comment-metadata">
                        <span class="comment-user">- @${username}</span>
                        <span class="date-posted">${created} ${/\d/.test(created) ? 'ago' : ''}</span>
                        <div class="thumbs">
                            <i class="like fa fa-thumbs-up" aria-hidden="true" data-user-liked="${didUserLike}"></i>
                            <i class="dislike fa fa-thumbs-down" aria-hidden="true" data-user-liked="${didUserLike}"></i>
                            <span class="posNeg">${posNeg}</span><span class="like-dislikes">${likes}</span>
                        </div>
                        <label class="reply-c-btn-label" for="">
                            <span class="show-reply-comments-txt">comments</span><span class="close-reply-comments-txt hidden">hide</span>
                            <button class="expand-reply-comments-btn" type="button"></button>
                        </label>
                    </div>
                    <div class="reply-comments-container">
                        
                        <div class="reply-comments-content" data-comment-id="${id}">
                            
                        </div>`;
    // <hr class="shadow-hr">`;
    if (state.loggedIn) { // Logged in, reply comment form displayed
        commentTemp += `<form class="reply-comment-form comment-form expand" method="POST" action="/posts/comments">
                            <textarea class="reply-comment-input comment-input" rows="" cols="" placeholder="Type your reply here . . ." required></textarea>
                            <button class="reply-comment-btn" type="submit">Reply</button>
                        </form>`;
    }
    // close comment <div>'s  
    commentTemp += `</div>
                 </div>`;
    return commentTemp;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated reply comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getReplyCommentTemplate(comment, byThisUser, didUserLike) {
    let content   = comment.content,
        username  = comment.author.username,
        created   = getElapsedTime(new Date(comment.created)),
        likes     = comment.likes,
        commentId = comment.commentId,
        id        = comment._id;
    let posNeg = '';
    if (likes < 0)
        posNeg = '&#45;';
    else if (likes > 0)
        posNeg = '+';
    return `<hr class="thin-hr">
            <div class="reply-comment" data-this-id="${id}">
                <p class="reply-comment-content gen-comment">${content}</p>
                <div class="reply-comment-metadata">
                    <span class="comment-user">- @${username}</span>
                    <span class="date-posted">${created} ${/\d/.test(created) ? 'ago' : ''}</span>
                    <div class="thumbs">
                        <i class="like fa fa-thumbs-up" aria-hidden="true" data-user-liked="${didUserLike}"></i>
                        <i class="dislike fa fa-thumbs-down" aria-hidden="true" data-user-liked="${didUserLike}"></i>
                        <span class="posNeg">${posNeg}</span><span class="like-dislikes">${likes}</span>
                    </div>
                </div>
            </div>`;
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays current posts in db to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPosts(_posts) {
    let posts = _posts.map((post) => {
        let specs = getDroneData(post.drone.make, post.drone.model);
        Object.assign(post, { specs });

        // check if current session user voted on this post
        let usersVoted = post.usersVoted;
        let didUserVote = usersVoted.find((user) => {
            return user === state.user
        });
        if (didUserVote !== undefined) {
            // console.log(`"${didUserVote}" voted on this post, ${post.id}!`);
        }

        // Check if post is by the current session user
        let byThisUser = false;
        if (post.author.username === state.user) {
            byThisUser = true;
        }
        return formReviewPost(post, byThisUser, didUserVote);
    });

    console.log(posts[4]);


    // Need to append when fetching batch at a time
    let postsStr = posts.join('');
    $(REVIEWS_CONTENT).html(postsStr);
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
        let $commentsContent = $(`${COMMENTS_CONTENT}[data-post-id="${postId}"]`);

        let $numComments = $commentsContent.parent(COMMENTS_CONTAINER)
                                           .find(NUM_COMMENTS);
        let count = parseInt($numComments.text());
        console.log('count', count);
        count++;
        $numComments.text(count);

        $commentsContent.append(commentHtml);
    } else {
        // Reply comments
        let commentId = comment.commentId;
        let commentHtml = getReplyCommentTemplate(comment);
        $(`.reply-comments-content[data-comment-id=${commentId}]`).append(commentHtml);
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Filters reviews 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function filterReviewHandler() {
    // Get checked radio
    let target = $('input[name="filter"]:checked', FILTER_FORM).val();
    // console.log(`make: ${make}`);
    // loop through DOM and check if any matches
    // if yes, loop through DOM and remove reviews that dont match
    let isMatch = false;
    $(REVIEWS_CONTENT).find(REVIEW)
        .each(function (index, review) {
            let make = $(this).find('.maker')
                              .first()
                              .text()
                              .toLowerCase();
            if (make.indexOf(target) >= 0) {
                isMatch = true;
                return;
            }
        });
    if (isMatch) {
        $(REVIEWS_CONTENT).find(REVIEW)
            .each(function (index, review) {
                let make = $(this).find('.maker')
                                  .first()
                                  .text()
                                  .toLowerCase();
                let $hr = $(this).prev();
                if (make.indexOf(target) === -1) {
                    $(this).add($hr).hide();
                } else {
                    $(this).add($hr).show();
                }
            });
        $(`${REVIEW}:visible`).first().prev('hr').hide(); // removes <hr> from top of filtered reviews
    } else {
        // display message, no reviews matching
        console.log('No Match');
        show(FILTER_ALERT);
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Opens login/signup modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function openLoginSignupModal(screen) {
    show(LOGIN_SIGNUP_PAGE);
    $(LOGIN_SIGNUP_PAGE).addClass('slide');
    $(LOGIN_SIGNUP_MODAL).addClass('slide');
    screen === 'login' ? displayLoginForm() : displaySignupForm();
    $('body').addClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Closes login/signup modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeLoginSignupModal() {
    $(LOGIN_SIGNUP_MODAL).removeClass('slide');
    $(LOGIN_SIGNUP_PAGE).removeClass('slide');
    $('body').removeClass('no-scroll');
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
// Displays welcome message to new user
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayWelcomeMessage(user) {
    show('.welcome-message-wrap');
    $('.new-user').text(user);
    $('.login-form .username-input').val(user);
    $('.login-form .pass-input').focus();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays errors from signup in modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySignupError(location, message) {
    openLoginSignupModal('signup');
    let err = message;
    show(SIGNUP_ERROR);
    if (location === 'email') {
        $(EMAIL_INPUT).addClass('error')
                      .val('')
                      .focus();
    } else if (location === 'username') {
        $(USERNAME_INPUT).addClass('error')
                         .val('')
                         .focus();
    } else if (location === 'password') {
        location = location[0].toUpperCase() + location.slice(1);
        err = `${location}: ${message}`;
        $(PASS_INPUT).addClass('error');
        $(PASS_INPUT)[0].focus();
    }
    $(PASS_INPUT).val('');
    $(`${SIGNUP_ERROR} .error-message`).text(err);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays errors from login in modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayLoginError(message) {
    openLoginSignupModal('login');
    show(LOGIN_ERROR);
    $(`${LOGIN_ERROR} .error-message`).text(message);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays EDIT review post modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayEditPostForm($post) {
    let content = $post.find('.content').html(),
        postTitle = $post.find('.post-title').text(),
        model = $post.find('.model').text(),
        id = $post.attr('data-post-id');

    // Removes <p> tags and adds '\n\n' chars to end of each paragraph
    // to display text in form the same way it is displayed on screen
    content = content.split('<p class="paragraph">')
                     .join('')
                     .split('</p>')
                     .map(para => para += '\n\n')
                     .join('')
                     .trim();
    
    show(EDIT_REVIEW_FORM_SCREEN);
    $('#edit-title-input').val(postTitle);
    $('#edit-post-content').val(content);
    $(`.dropdown-options option[value="${model}"]`).prop('selected', true);
    $(EDIT_REVIEW_FORM).attr('data-post-id', id);
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
    let email      = $form.find('.email-input').val(),
        username   = $form.find('.username-input').val(),
        password   = $form.find(PASS_INPUT).val(),
        rePassword = $form.find('.re-pass-input').val();
    if (password !== rePassword) {
        alert('passwords did not match.');
        $('.signup-form ' + PASS_INPUT).addClass('error');
    } else {
        $('.signup-form ' + PASS_INPUT).removeClass('error');
        closeLoginSignupModal();
        let data = { email, username, password };
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
    let data = { username, password };

    closeLoginSignupModal();
    setTimeout(function () {
        logUserIn(data); // makes call to api
    }, 1000);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function reviewFormHandler($form, editForm = false) {
    let $selectedOpt = $($form).find('.dropdown-options')
                               .find(":selected"),
        make         = $selectedOpt.parent()
                                   .attr('label')
                                   .toLowerCase(),
        model        = $selectedOpt[0].value,
        title        = $('#title-input').val(),
        content      = $('#post-content').val(),
        rating       = $('input[name=star]:checked').val();

    let $fileInput = $form.find('.img-file-input');
    let file = $fileInput.val() !== undefined ? $fileInput[0].files[0] : null;
    console.log(file);

    content = content.split('\n\n');
    console.log({content});

    let post = {
        drone: { make, model },
        title,
        content,
        rating
    };

    if (editForm) {
        post.content = $('#edit-post-content').val();
        post.content = post.content.split('\n\n'); // Create array of strings, one per paragraph
        post.id = $form.attr('data-post-id');
        post.title = $('#edit-title-input').val();

        // ajax PUT request to db
        updatePost(post, file);
    } else {
        // ajax POST request to db
        createPost(post, file);
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Formulates review post for preview before actually 
// submitting
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function previewReviewHandler(form) {
    let elements     = $(form)[0].elements,
        $selectedOpt = $(elements["make"]).find(":selected"),
        droneMake    = $selectedOpt.parent().attr('label'),
        droneModel   = $selectedOpt[0].value,
        droneData    = getDroneData(droneMake, droneModel),
        title        = elements['title'].value,
        content      = elements['content'].value,
        user         = state.user,
        post         = { user, droneData, title, content };

    content = content.split('\n\n'); // Create array of strings, one per paragraph


    // MAKE sure text going into edit review mode doesnt have <p> already 

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
// Collects data from comment form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function commentFormHandler($form) {
    let url      = $form.attr('action'),
        content  = $form.find('.comment-input').val(),
        postId   = $form.siblings(COMMENTS_CONTENT).attr('data-post-id'),
        username = state.user;
    let comment = {
        url,
        content,
        author: { username },
        created: Date.now()
    }

    console.log(comment.created);

    if ($form.hasClass('reply-comment-form')) {
        comment['commentId'] = $form.closest('.comment').attr('data-this-id');
    } else if (postId !== undefined) {
        comment.postId = postId;
    }
    // call to ajax POST method
    postComment(comment);
    // reset form after submit
    $form[0].reset()
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
    $('.dropdown-options').empty();
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
        $('.dropdown-options').append(optGroup);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) comments for given post
// and hides Specs if open
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleComments(commentsBtn) {
    let $review         = $(commentsBtn).parents(REVIEW),
        $commentSection = $review.find(COMMENTS_CONTAINER),
        $details        = $review.find(DETAILS),
        $specs_btn      = $review.find(SPECS_BTN);
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
    let $review         = $(specBtn).parents(REVIEW),
        $details        = $review.find(DETAILS),
        $commentSection = $review.find(COMMENTS_CONTAINER),
        $commentS_btn   = $review.find(COMMENTS_BTN);
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
            let { byThisUser, didUserLike } = checkIfFromCurrentUser(comment);
            return getCommentTemplate(comment, byThisUser, didUserLike);
        });
        let numComments = commentsHtml.length;
        let $commentsContent = $(`${COMMENTS_CONTENT}[data-post-id="${postId}"]`);

        $commentsContent.parent(COMMENTS_CONTAINER)
            .find(NUM_COMMENTS)
            .text(numComments);
        // Find comments-content by data-id and append 
        $commentsContent.append(commentsHtml.join(''));

        // Make additional calls to db to fetch each reply comment
        comments.forEach((comment) => {
            getCommentsFromDb(comment.id, false);
        });
    } else {
        let commentId = id;
        let commentsHtml = comments.map((comment) => {
            let { byThisUser, didUserLike } = checkIfFromCurrentUser(comment);
            return getReplyCommentTemplate(comment, byThisUser, didUserLike);
        });

        $(`${REPLY_COMMENT_CONTENT}[data-comment-id="${commentId}"]`).append(commentsHtml.join(''));
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Checks if comment is by the curren user logged in 
// in session.
//
// @return   byThisUser, boolean signifying if the comment is
//                       by this user.
//          didUserLike, if user liked this comment, returns
//                       their username. undefined otherwise
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkIfFromCurrentUser(comment) {
    // check if current session user voted on this post
    let usersLiked = comment.usersLiked;
    let didUserLike = usersLiked.find((user) => {
        return user === state.user
    });
    // Check if post is by the current session user
    let byThisUser = false;
    if (comment.author.username === state.user) {
        byThisUser = true;
    }

    // console.log({ didUserLike });

    if (didUserLike !== undefined) {
        // console.log(`"${didUserLike}" voted on this comment, ${comment.id}!`);
    }
    return { byThisUser, didUserLike };
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Sets img from db to corresponding post  
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function addImgToPostHandler(imgRes, postId = null) {
    $(REVIEWS).find(`.post[data-post-id="${postId}"]`)
        .find('.post-img')
        .attr('src', imgRes.url);
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
        // console.log(post);
        if (post.imgId !== '') {
            getFile(post.imgId, post.id);
        }
        getCommentsFromDb(post.id);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Upvote / Downvote post handler
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function voteOnPost($voteBtn, upVote = true) {
    if ($voteBtn.attr('data-user-voted') === state.user) {
        alert('Already voted');
        return;
    }

    let $votes  = $voteBtn.siblings(VOTES),
        $posNeg = $voteBtn.siblings(POSNEG),
        count   = parseInt($votes.text()),
        postId  = $voteBtn.closest('.post').attr('data-post-id'),
        posNeg  = '';

    upVote ? ++count : --count;
    if (count < 0)
        posNeg = '&#45;';
    else if (count > 0)
        posNeg = '+';

    $posNeg.html(posNeg);
    $votes.text(count);
    $voteBtn.attr('data-user-voted', state.user);

    getPostById(postId, function (res) {
        let usersArr = res.usersVoted;
        usersArr.push(state.user);

        updatePost({
            id: postId,
            votes: count,
            usersVoted: usersArr
        });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Like / Dislike comments handler
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function likeDislikeComment($btn, like = true) {
    if ($btn.attr('data-user-liked') === state.user) {
        alert('Already like');
        return;
    }

    let $likes    = $btn.siblings(LIKES),
        $posNeg   = $btn.siblings(POSNEG),
        count     = parseInt($likes.text()),
        commentId = $btn.closest('.gen-comment').attr('data-this-id'),
        posNeg    = '';

    like ? ++count : --count;
    if (count < 0)
        posNeg = '&#45;';
    else if (count > 0)
        posNeg = '+';

    $posNeg.html(posNeg);
    $likes.text(count);
    $btn.attr('data-user-liked', state.user);
    $btn.siblings('i').attr('data-user-liked', state.user);

    getCommentById(commentId, function (res) {
        let usersArr = res.usersLiked;
        usersArr.push(state.user);

        updateComment({
            id: commentId,
            likes: count,
            usersLiked: usersArr
        });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Takes response from file upload and updates the given post
// via its post ID with a reference to the uploaded file 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fileUploadHandler(file, postId) {
    console.log({ file, postId });
    let updateData = {
        id: postId,
        imgId: file.file._id
    };
    updatePost(updateData);
}



//================================================================================
// API calls
//================================================================================

// USERS 

function createNewUser(userData) {
    $.ajax({
        url: '/users',
        type: 'POST',
        dataType: 'json',
        data: userData,
        success: (res) => {
            // Successfully signed user up, now log them in
            // location.reload();
            $(SIGNUP_FORM)[0].reset();
            openLoginSignupModal('login');
            displayWelcomeMessage(res.username);
        },
        error: (err) => {
            let message = err.responseJSON.message;
            let location = err.responseJSON.location;
            displaySignupError(location, message);
            console.log(`${location}: ${message}`);
        }
    });
}

function logUserIn(loginData) {
    // console.log(loginData);
    $.ajax({
        url: '/users/login',
        type: 'POST',
        dataType: 'json',
        beforeSend: function (xhr) {
            // Send basic auth, uri-encoded header with request
            xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(loginData.username + ':' + loginData.password))));
        },
        success: (res) => {
            console.log(res);
            if (res.status) {
                location.reload();
            } else {
                displayLoginError(res.message);
            }
        },
        error: (err) => {
            console.log(err);
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

// POSTS

function getPostsFromDb() {
    $.ajax({
        url: "/posts",
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            postsHandler(res.posts);
        }
    });
}

function getPostById(id, callback) {
    return $.ajax({
        url: `/posts/${id}`,
        type: 'GET',
        dataType: 'json',
        success: callback
    });
}

function createPost(postData, file) {
    $.ajax({
        url: `/posts`,
        type: 'POST',
        dataType: 'json',
        data: postData,
        success: res => {
            console.log('Success');
            console.log(res);
            if (file) {
                uploadFile(file, res.id);
            } else {
                location.reload();
            }
        }
    });
}

function updatePost(updateData, file) {
    let id = updateData.id;
    $.ajax({
        url: `/posts/${id}`,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: res => {
            console.log(res);
            if (file) {
                if (res.imgId !== "") {
                    deleteFile(res.imgId);
                }
                uploadFile(file, res.id);
            } else {
                console.log("RES:", res);
                if (res.hasOwnProperty('title') && !(updateData.hasOwnProperty('votes')))
                    location.reload();
            }
        }
    });
}

function deletePost(id) {
    $.ajax({
        url: `/posts/${id}`,
        type: 'DELETE',
        dataType: 'json',
        success: res => {
            location.reload();
        }
    });
}

// FILES

function uploadFile(blobFile, postId) {
    let formData = new FormData();
    formData.append('file', blobFile);

    $.ajax({
        url: '/file/img',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: res => {
            fileUploadHandler(res, postId);
        },
        error: (jqXHR, textStatus, errorMessage) => {
            console.log(errorMessage);
        }
    });
}

function getFile(id, postId) {
    $.ajax({
        url: `/file/img/${id}`,
        type: 'GET',
        dataType: 'json',
        success: res => {
            addImgToPostHandler(res, postId);
        }
    });
}

function deleteFile(id) {
    $.ajax({
        url: `/file/img/${id}`,
        type: "DELETE",
        success: res => {
            consle.log({ res });
            console.log(`successfully deleted img(${id})`);
        }
    });
}

// COMMENTS

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
        success: function (res) {
            if (res.comments.length > 0) {
                //  Main comment                //  Reply comment
                mainComments ? commentsFromDbHandler(res.comments) : commentsFromDbHandler(res.comments, false, id)
            }
        }
    });
}

function getCommentById(id, callback) {
    $.ajax({
        url: `/posts/comments/${id}`,
        type: 'GET',
        dataType: 'json',
        success: callback
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
    console.log({ updateData });
    $.ajax({
        url: `/posts/comments/${id}`,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: res => {
            console.log('Success');
            console.log({ res });
        }
    });
}

// ================================================================================
// Slick Carousel
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Drone banner carousel
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initDroneSlider() {
    $(DRONE_SLIDER).slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 2400,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    // infinite: false,
                    // dots: false
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 415,
                settings: {
                    // autoplay: true,
                    // autoplaySpeed: 5000,
                    speed: 2000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: 'ease-in-out'
                    // centerMode: true,
                    // focusOnSelect: true

                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Intializes drone slider and sets height to zero
// before and unsets height after it is 'slicked'
// to avoid FOUC
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function displayDroneSlider() {
    $('.slick-slider').css('height', '0px');
    initDroneSlider();
    $('.slick-slider').css('height', '');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//          Destroys slick carousels
// @params   Slider element to be destroyed
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function unslick(SLIDER) {
    if ($(SLIDER).hasClass('slick-initialized')) {
        $(SLIDER).slick('unslick');
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Used to reslick sliders on window resize 
//  inccrease. 
//  Slick settings handles unslick for mobile 
//  but does not reslick when window size increases
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function responsiveReslick() {
    $(window).resize(function () {
        let width = parseInt($('body').css('width'));
        if (!$(DRONE_SLIDER).hasClass('slick-initialized')) {
            initDroneSlider();
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Calculates time elapsed since date given and returns
// the appropriate time unit, rounding down to nearest whole
// number 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getElapsedTime(prevDate) {
    let diff   = Date.now() - prevDate,
        min    = Math.floor(diff / 60000),  // 60,000 ms / min
        hrs    = Math.floor(diff / 3600000), // 3,600,000 ms / hr
        days   = Math.floor(diff / 86400000), // 6,400,000 ms / day
        months = Math.floor(diff / 2629746000),// 2629746000 ms / month
        years  = Math.floor(diff / 31556952000);// 31,556,952,000 ms / year

    if (min < 60) {
        if(min < 1)        return 'just now';
        else if(min === 1) return 'a minute';
        else               return min + ' minutes';
    } else if (hrs < 24) {
        return `${hrs} ${hrs === 1 ? 'hour' : 'hours'}`;
    } else if (days < 31) {
        return `${days} ${days === 1 ? 'day' : 'days'}`;
    } else if (months < 12) {
        return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets tabs from user in textarea and adds correct ascii
// char to text, '\t'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function tabFromTextareaHandler(textarea) {
    // grab caret position/selection
    let start     = textarea.selectionStart;
    let end       = textarea.selectionEnd;
    let $textarea = $(textarea);
    let value     = $textarea.val();

    console.log('tab pressed');

    // set textarea value to text before caret + '\t' + text after caret
    $textarea.val(value.substring(0, start) 
                + '\t' 
                + value.substring(end));
    // put caret at right position again +1 for tab
    textarea.selectionStart = textarea.selectionEnd = start + 1;
}


//================================================================================
// Event Listeners
//================================================================================


// * * * * * * * * * * * * *
//   Nav item clicks
// * * * * * * * * * * * * * 
function burgerMenuClick() {
    $(BURGER_ANCHOR).on('click', (e) => {
        e.preventDefault();
        $(MOBILE_MENU).toggleClass('open');
        $(BURGER_WRAP).toggleClass('open');
        $(BURGER_ICON).toggleClass('open');
        // $('body').toggleClass('no-scroll');
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

// * * * * * * * * * * * * * 
//   Login modal btn
// * * * * * * * * * * * * * 
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


// * * * * * * * * * * * * * 
// Login form SUBMIT
// * * * * * * * * * * * * * 
function loginFormSubmit() {
    $(LOGIN_FORM).on('submit', function (e) {
        e.preventDefault();
        loginFormHandler($(this));
    });
}


// * * * * * * * * * * * * * 
// Logout btn
// * * * * * * * * * * * * * 
function logOutBtnClick() {
    $(LOGOUT_BTN).on('click', (e) => {
        e.preventDefault();
        logUserOut();
    });
}


// * * * * * * * * * * * * * 
// Signup modal btn
// * * * * * * * * * * * * * 
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


// * * * * * * * * * * * * * 
// Signup form SUBMIT
// * * * * * * * * * * * * * 
function signupFormSubmit() {
    $(SIGNUP_FORM).on('submit', function (e) {
        e.preventDefault();
        signupFormHandler($(this));
    });
}



function signupScreenClick() {
    $(SIGNUP_SCREEN_BTN).on('click', function (e) {
        e.preventDefault();
        displaySignupForm();
    });
}

function loginScreenClick() {
    $(LOGIN_SCREEN_BTN).on('click', function (e) {
        e.preventDefault();
        displayLoginForm();
    });
}

function signupLoginCloseClick() {
    $(window).on('click', (e) => {
        if (e.target === $(LOGIN_SIGNUP_PAGE)[0] || e.target === $(LOGIN_SIGNUP_X)[0]) {
            closeLoginSignupModal();
        }
    });
}


// * * * * * * * * * * * * * 
// Aside Filter
// * * * * * * * * * * * * * 
function asideFilterBtnHover() {
    $(ASIDE_BTN).mouseenter((e) => {
        e.preventDefault();
        $(ASIDE_CONTAINER).addClass('slide');
        $('.aside-chevron').addClass('flip');
    });

    $(ASIDE_BTN).on('click', (e) => {
        e.preventDefault();
        $(ASIDE_CONTAINER).removeClass('slide');
        $('.aside-chevron').removeClass('flip');
    });
}

//
// Clear filters -- show all reviews
//
function clearAsideFiltersClick() {
    $('.clear-btn').on('click', (e) => {
        e.preventDefault();
        console.log('click');
        hide(FILTER_ALERT);
        $(REVIEW).add($('hr')).show();

        $('#radio-filter-form')[0].reset();
    });
}

//
// Filter reviews
//
function filterBtnClick() {
    $(FILTER_FORM).submit(e => {
        e.preventDefault();
        hide(FILTER_ALERT);
        filterReviewHandler();
    });
}



// * * * * * * * * * * * * * 
// Reviews / Posts
// * * * * * * * * * * * * * 
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
        hide(EDIT_REVIEW_FORM_SCREEN);
        $('body').removeClass('no-scroll');
    });
}


// * * * * * * * * * * * * * 
// preview post
// * * * * * * * * * * * * * 
function previewBtnClick() {
    $(PREVIEW_BTN).on('click', function (e) {
        e.preventDefault();
        let isReviewForm = $(this).closest('form')
            .is(REVIEW_FORM);
        previewReviewHandler(isReviewForm ? REVIEW_FORM : EDIT_REVIEW_FORM);
    });
}

function previewCloseBtnClick() {
    $(PREIVEW_CLOSE_BTN).on('click', (e) => {
        e.preventDefault();
        hide(PREVIEW_SCREEN);
    });
}


// * * * * * * * * * * * * * 
// Edit post
// * * * * * * * * * * * * * 
function editPostIconClick() {
    $(REVIEWS).on('click', EDIT_POST_ICON, function (e) {
        e.preventDefault();
        console.log('Edit clicked');
        let $post = $(this).closest('.post');
        displayEditPostForm($post);
    });
}


// * * * * * * * * * * * * * 
// Review form SUBMIT
// * * * * * * * * * * * * * 
function reviewFormSubmit() {
    $(REVIEW_FORM).submit(function (e) {
        e.preventDefault();
        reviewFormHandler($(this));
    });
}


// * * * * * * * * * * * * * 
// EDIT Review form SUBMIT
// * * * * * * * * * * * * * 
function editReviewFormSubmit() {
    $(EDIT_REVIEW_FORM).submit(function (e) {
        e.preventDefault();
        reviewFormHandler($(this), true);
    });
}


function commentBtnClick() {
    $(REVIEWS).on('click', COMMENTS_BTN, function (e) {
        e.preventDefault();
        toggleComments($(this));
    });
}

function deletePostModalBtnClick() {
    $(DELETE_POST_MODAL_BTN).on('click', (e) => {
        e.preventDefault();
        console.log('clicked');
        show(DELETE_POST_MODAL);
        $(EDIT_REVIEW_FORM_SCREEN + ' .review-form-modal').addClass('faded');
    });
}

function deletePostBtnClick() {
    $(DELETE_POST_BTN).on('click', function (e) {
        e.preventDefault();
        let id = $(this).closest(EDIT_REVIEW_FORM).attr('data-post-id');
        deletePost(id);
    });
}

function goBackBtnClick() {
    $(GO_BACK_BTN).on('click', (e) => {
        e.preventDefault();
        $(EDIT_REVIEW_FORM_SCREEN + ' .review-form-modal').removeClass('faded');
        hide(DELETE_POST_MODAL);
    });
}


// * * * * * * * * * * * * * 
// Post Votes 
// * * * * * * * * * * * * * 
function upVoteClick() {
    $(REVIEWS).on('click', UPVOTE_ARROW, function (e) {
        e.preventDefault();
        if (state.loggedIn)
            voteOnPost($(this));
        else
            alert('Must be logged in');
    });
}

function downVoteClick() {
    $(REVIEWS).on('click', DOWNVOTE_ARROW, function (e) {
        e.preventDefault();
        if (state.loggedIn)
            voteOnPost($(this), false);
        else
            alert('Must be logged in');
    });
}

// * * * * * * * * * * * * * 
// Comment Likes
// * * * * * * * * * * * * * 
function commentLikeClick() {
    $(REVIEWS).on('click', LIKE, function (e) {
        e.preventDefault();
        if (state.loggedIn)
            likeDislikeComment($(this));
        else
            alert('Must be logged in');
    });
}

function commentDislikeClick() {
    $(REVIEWS).on('click', DISLIKE, function (e) {
        e.preventDefault();
        if (state.loggedIn)
            likeDislikeComment($(this), false);
        else
            alert('Must be logged in');
    });
}


// * * * * * * * * * * * * * 
// Comment form SUBMIT
// * * * * * * * * * * * * * 
function commentFormSubmit() {
    $(REVIEWS).on('submit', COMMENT_FORM, function (e) {
        e.preventDefault();
        if (state.loggedIn)
            commentFormHandler($(this));
        else
            console.log('Must be logged in');
    })
}

function replyCommentFormSubmit() {
    $(REVIEWS).on('submit', REPLY_COMMENT_FORM, function (e) {
        e.preventDefault();
        if (state.loggedIn)
            commentFormHandler($(this));
        else
            console.log('Must be logged in');
    });
}

function replyCommentsArrowClick() {
    $(REVIEWS).on('click', '.expand-reply-comments-btn', function (e) {
        e.preventDefault();
        $(this).closest('.comment')
               .find('.reply-comments-container')
               .toggleClass('expand');
        $(this).toggleClass('open');
        $(this).siblings().toggleClass('hidden');
    });
}

function specsBtnClick() {
    $(REVIEWS).on('click', SPECS_BTN, function (e) {
        e.preventDefault();
        toggleSpecs($(this));
    });
}

// * * * * * * * * * * * * 
// Textarea Keydown (TAB)
// * * * * * * * * * * * * 
function getTabFromTextarea() {
    $('textarea').keydown(function(e) {
        if (e.keyCode === 9) {
            e.preventDefault();
            console.log('in listener');
            tabFromTextareaHandler(this);
        }
    });
}

//================================================================================
// Event Listener Groups
//================================================================================
function navMenuEvents() {
    burgerMenuClick();
    mobileMenuItemClick();
    reviewsNavItemClick();
    loginBtnsClick();
    signupBtnsClick();
    logOutBtnClick();
}

function signupLoginFormEvents() {
    signupScreenClick();
    loginScreenClick();
    signupLoginCloseClick();
    signupFormSubmit();
    loginFormSubmit();
}

function writeReviewFormEvents() {
    writeReviewNavClick();
    previewBtnClick();
    previewCloseBtnClick();
    closeReviewFormClick();
    reviewFormSubmit();
    editReviewFormSubmit();
    deletePostModalBtnClick();
    deletePostBtnClick();
    goBackBtnClick();
    // getTabFromTextarea();
}

function asideEvents() {
    asideFilterBtnHover();
    clearAsideFiltersClick();
    filterBtnClick();
}

function reviewEvents() {
    commentBtnClick();
    specsBtnClick();
    commentFormSubmit();
    upVoteClick();
    downVoteClick();
    commentLikeClick();
    commentDislikeClick();
    replyCommentsArrowClick();
    editPostIconClick();
}

function utils() {
    fixBannerNav();
    fillDroneOptGroups();
    displayDroneSlider(); // inits drone slider and conceals FOUC
    responsiveReslick();
}

//================================================================================
// Entry point -- Main
//================================================================================

$(function () {
    utils();
    navMenuEvents();
    signupLoginFormEvents();
    writeReviewFormEvents();
    asideEvents();
    reviewEvents();
    // getAndDisplayReviews();

    // openLoginSignupModal('signup');

    getPostsFromDb();
});