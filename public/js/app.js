'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var state = {
    loggedIn: false,
    user: '',
    isMobile: false,
    player: null,
    expanded: false,
    video: {
        query: '',
        nextPageToken: ''
    },
    prevScrollPos: 0,
    downScrollPos: 0
};

// Banner Nav
var BANNER_WRAP = '.banner-wrap';
var BURGER_ANCHOR = '.burger-anchor';
var BURGER_WRAP = '.burger-icon-wrap';
var BURGER_ICON = '#burger-icon';
var MOBILE_MENU = '.mobile-menu';
var MOBILE_MENU_ITEM = '.mobile-menu li';
var REVIEWS_NAV_ITEM = '.reviews';
var LOGIN_BTN = '.login';
var SIGNUP_BTN = '.signup';
var LOGOUT_BTN = '.logout';
// Login / Signup Modal
var LOGIN_SIGNUP_PAGE = '#login-signup';
var LOGIN_SIGNUP_MODAL = '.login-signup-container';
var SIGNUP_FORM = '.signup-form';
var LOGIN_FORM = '.login-form';
var SIGNUP_SCREEN_BTN = '.signup-screen-btn';
var LOGIN_SCREEN_BTN = '.login-screen-btn';
var LOGIN_SIGNUP_X = '#login-signup-x';
var PASS_INPUT = '.pass-input';
var EMAIL_INPUT = '.email-input';
var USERNAME_INPUT = '.username-input';
var SIGNUP_ERROR = '.signup-error';
var LOGIN_ERROR = '.login-error';
// Write Review Form
var REVIEW_FORM_SCREEN = '#review-form-screen';
var EDIT_REVIEW_FORM_SCREEN = '#edit-review-form-screen';
var REVIEW_FORM = '#review-form';
var EDIT_REVIEW_FORM = '#edit-review-form';
var CLOSE_BTN = '.close-btn';
var WRITE_REVIEW_NAV = '.write-review';
var DELETE_POST_MODAL_BTN = '.delete-post-modal-btn';
var DELETE_POST_MODAL = '.delete-confirm-modal';
var DELETE_POST_BTN = '.delete-post-btn';
var GO_BACK_BTN = '.go-back-btn';
// Review Preview Screen
var PREVIEW_SCREEN = '#review-post-preview';
var PREVIEW_CONTENT = '.preview-content';
var PREVIEW_BTN = '.preview-btn';
var PREIVEW_CLOSE_BTN = '.preview-close-btn';
var INTERACTIONS = '.interactions';
// Drone carousel
var DRONE_SLIDER = '.drone-slider';
var DRONE_MODELS_SLIDER = '.drone-models-slider';
// Drone detail page
var DETAIL_MAKE = '.detail-make';
var DETAIL_MODEL = '.detail-model';
var DETAIL_LISTS = '.detail-lists';
var AMAZON_LINK = '.amazon-link';
var MAIN_VID = '.main-video iframe';
var G_VID_1 = '.g-top-left img';
var G_VID_2 = '.g-top-right img';
var G_VID_3 = '.g-bottom-left img';
var G_VID_4 = '.g-bottom-right img';
var G_IMG = '.g-video img';
var EXPAND_ARROW = '.main-video-wrap .fa.fa-expand';
var V_CLOSE_ICON = '.v-modal-close.fa.fa-times';
var VIDEO_BACKDROP = '.video-backdrop';
var MODAL_IFRAME = '.frame-wrap iframe';
var MORE_ICON = '.more-icon.fa';
var SHOWCASE = '.showcase-wrap';
var GALLERY = '.video-gallery';
// Aside Filter
var ASIDE_BTN = '.aside-slide-btn';
var ASIDE_CONTAINER = '.aside-container';
var SEARCH_FILTER_FORM = '#search-filter-form';
var SEARCH_FILTER = '.search-filter';
var QUERY_TEXT = '.query-text';
var USER_QUERY = '.js-user-query';
var QUERY_ERROR_MESSAGE = '.query-error-message';
var FILTER_FORM = '#radio-filter-form';
var USER_FILTER = '.js-user-filter';
var FILTER_STATUS = '.filter-status';
var FILTER_ALERT = '.filter-alert';
var FILTER_BTN = '.filter-btn';
var CLEAR_BTN = '.clear-btn';
// Review 
var REVIEWS = '#reviews';
var REVIEWS_CONTAINER = '#reviews-container';
var REVIEWS_CONTENT = '#reviews-content';
var REVIEW = '.review';
var DETAILS = '.details';
var SPECS_BTN = '.specs-btn';
var EXPAND = '.expand';
// review/comment Interactions
var UPVOTE_ARROW = '.up-vote-arrow';
var DOWNVOTE_ARROW = '.down-vote-arrow';
var VOTES = '.js-votes';
var LIKE = '.like';
var DISLIKE = '.dislike';
var LIKES = '.like-dislikes';
var POSNEG = '.posNeg';
var EDIT_POST_ICON = '#edit-post-icon';
// Comments
var COMMENTS_BTN = '.comments-btn';
var COMMENTS_CONTAINER = '.comments-container';
var COMMENT_BTN = '.comment-btn';
var COMMENTS_CONTENT = '.comments-content';
var COMMENT_FORM = '.comment-form';
var COMMENT_INPUT = '.comment-input';
var NUM_COMMENTS = '.js-comments-num';
// reply comments
var REPLY_COMMENT_FORM = '.reply-comment-form';
var REPLY_COMMENT_INPUT = '.reply-comment-input';
var REPLY_COMMENT_CONTENT = '.reply-comments-content';
var SHOW_REPLY_COMMENTS_TXT = '.show-reply-comments-txt';
var CLOSE_REPLY_COMMENTS_TXT = '.close-reply-comments-txt';
var SUB_SIGNUP_BTN = '.sub-signup';
var SUB_LOGIN_BTN = '.sub-login';
// Footer
var TOP_TOP_ARROW = '.to-top';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated review post template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function formReviewPost(postData) {
    var byThisUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var userVoted = arguments[2];

    var $this = postData;

    var id = $this.id,
        author = $this.author.username || state.user,
        // If username isnt attached to post, this is new post & attach current session user
    make = $this.specs.brand,
        model = $this.specs.model,
        url = $this.specs.url,
        modelId = $this.drone.model,
        makeId = $this.drone.make,
        title = $this.title,
        content = $this.content,
        specs = $this.specs,
        img_src = specs.img,
        votes = $this.votes || 0,
        rating = $this.rating,
        created = getElapsedTime(new Date($this.created));

    // Amazon product link
    var amazonLink = $this.specs.link;

    content = content.map(function (paragraph) {
        return '<p class="paragraph">' + paragraph + '</p>';
    });

    var stars = '';
    for (var i = 0; i < rating; i++) {
        stars += '<span class="star filled-star">&#9734;</span>';
    }

    var posNeg = '';
    if (votes < 0) posNeg = '&#45;';else if (votes > 0) posNeg = '+';

    var review = '<div class="review">\n                        <div class="post" data-post-id="' + id + '" data-drone-model="' + modelId + '">\n                            <div class="img-container">\n                                <img class="post-img" src="' + img_src + '">\n                                <h3>Model: <span class="model">' + model + '</span></h3>\n                                <h5>Manufacturer: <b><span class="maker"><a href="/drones/' + url + '">' + make + '</a></span></b></h5>\n                                <div class="post-rating" data-rating="' + rating + '">\n                                    <label>User rating: </label>\n                                    <div class="post-stars">' + stars + '</div>\n                                </div>\n                            </div>\n                            <h2 class="post-title">' + title + '</h2>\n                            <hr class="shadow-hr">\n                            <div class="vote-aside">\n                                <div class="arrow-wrap">\n                                    <i class="up-vote-arrow fa fa-arrow-up" aria-hidden="true" data-user-voted="' + userVoted + '"></i>\n                                    <span class="posNeg">' + posNeg + '</span><span class="js-votes">' + votes + '</span>\n                                    <i class="down-vote-arrow fa fa-arrow-down" aria-hidden="true" data-user-voted="' + userVoted + '"></i>\n                                </div>\n                            </div>\n                            <div class="content">\n                                ' + content.join('') + '\n                            </div>\n                            <hr class="mobile-only post-hr">\n                            <div class="post-attr">\n                                \n                                <div class="c-date-edit-wrap">\n                                    \n                                    <span class="date-posted">submitted  ' + created + ' ' + (/\d/.test(created) ? 'ago' : '') + ' by</span> <label class="author-label" for=""><span class="author">' + author + '</span></label>\n                                    ' + (byThisUser ? '<i id="edit-post-icon" class="fa fa-pencil-square-o" aria-hidden="true"></i>' : '') + ' \n                                </div>\n                            </div>\n\n                            <div class="mobile-vote-aside">\n                                <i class="up-vote-arrow fa fa-arrow-up" data-user-voted="' + userVoted + '" aria-hidden="true"></i>\n                                <span class="posNeg">' + posNeg + '</span><span class="votes js-votes">' + votes + '</span>\n                                <i class="down-vote-arrow fa fa-arrow-down" data-user-voted="' + userVoted + '" aria-hidden="true"></i>\n                            </div>\n                            <div class="interactions">\n                                <button class="specs-btn" type="button">\n                                    Specs\n                                    <i class="fa fa-plus" aria-hidden="true"></i>\n                                </button>\n                                <button class="comments-btn" type="button">\n                                    Comments\n                                    <i class="fa fa-comment-o" aria-hidden="true"></i>\n                                </button>\n                            </div>\n                        </div>\n                        <div class="details">\n                            <div class="detail-header">\n                                <h3>Model: <span class="model">' + model + '</span></h3>\n                                <h5>Manufacturer: <span class="maker"><b><a href="/drones/' + url + '">' + make + '</a></b></span></h5>\n                                <div class="amazon-link-wrap">\n                                    <h4>Grab one: <span class="amazon-link">' + amazonLink + '</span></h4>\n                                </div>\n                            </div>\n                            <div class="specs">\n                                <dl class="main-specs">\n                                    <dt>Specs</dt>\n                                    <dd>Avg. Price: <span>$' + specs.price + '</span></dd>\n                                    <dd>Camera: <span>' + specs.camera + '</span></dd>\n                                    <dd>Max Flight Time: <span class="max-flight">' + specs.max_flight_time + '</span></dd>\n                                    <dd>Max Range: <span>' + specs.max_range + '</span></dd>\n                                    <dd>Max Speed: <span>' + specs.max_speed + '</span></dd>\n                                    <dd>GPS?: <span>' + specs.gps + '</span></dd>\n                                    <dd>3-axis gimbal: <span>' + specs.gimbal + '</span></dd>\n                                    <dd>Flips: <span>' + (specs.flips || 'NO') + '</span></dd>\n                                </dl>\n\n                                <dl class="mode-specs">\n                                    <dt>Modes</dt>\n                                    <dd>Intelligent Flight: <span>' + specs.intelligent_flight + '</span></dd>\n                                    <dd>Avoidance: <span>' + (specs.avoidance || 'NO') + '</span></dd>\n                                    <dd>Return Home: <span>' + (specs.return_home || 'NO') + '</span></dd>\n                                    <dd>Follow-Me Mode: <span>' + (specs.follow_me_mode || 'NO') + '</span></dd>\n                                    <dd>Tracking Mode: <span>' + (specs.tracking_mode || 'NO') + '</span></dd>\n                                </dl>\n                            </div>\n                        </div>\n                        <div class="comments-container">\n                            <header class="comments-header">\n                                <span class="js-comments-num">0</span> Comments\n                                <i class="fa fa-comment-o" aria-hidden="true"></i>\n                            </header>\n                            <div class="comments-content" data-post-id="' + id + '">\n\n                            </div>\n                            <hr class="shadow-hr">';
    if (state.loggedIn) {
        // Logged in, comment form displayed
        review += '<form class="comment-form" method="post" action="/posts/comments">\n                                <textarea class="comment-input" rows="" cols="" placeholder="Write comment here . . ." required></textarea>\n                                <button class="comment-btn" type="submit">Comment</button>\n                            </form>';
    } else {
        // Not logged in, message to log in to write comment
        review += '<div class="login-message-container">\n                                <p class="login-message">Must be logged in to write a comment.</p>\n                                <ul class="comment-nav">\n                                    <li><a href="#" class="sub-login">LogIn</a></li>\n                                    <li><a href="#" class="sub-signup">Sign Up</a></li>\n                                </ul>\n                            </div>';
    }
    // close review <div>'s            
    review += '</div>\n                    </div>\n                    <hr class="post-hr">';
    return review;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getCommentTemplate(comment, byThisUser, didUserLike) {
    var content = comment.content,
        username = comment.author.username,
        created = getElapsedTime(new Date(comment.created)),
        likes = comment.likes,
        postId = comment.postId,
        id = comment.id;
    var posNeg = '';
    if (likes < 0) posNeg = '&#45;';else if (likes > 0) posNeg = '+';

    var commentTemp = '<div class="comment gen-comment" id="_' + id + '" data-post-id="' + postId + '" data-this-id="' + id + '">\n                    <p class="comment-content">' + content + '</p>\n                    <div class="comment-metadata">\n                        <span class="comment-user">- @' + username + '</span>\n                        <span class="date-posted">' + created + ' ' + (/\d/.test(created) ? 'ago' : '') + '</span>\n                        <div class="thumbs">\n                            <i class="like fa fa-thumbs-up" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                            <i class="dislike fa fa-thumbs-down" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                            <span class="posNeg">' + posNeg + '</span><span class="like-dislikes">' + likes + '</span>\n                        </div>\n                        <label class="reply-c-btn-label" for="">\n                            <span class="show-reply-comments-txt">comments</span><span class="close-reply-comments-txt hidden">hide</span>\n                            <button class="expand-reply-comments-btn" type="button"></button>\n                        </label>\n                    </div>\n                    <div class="reply-comments-container">\n                        \n                        <div class="reply-comments-content" data-comment-id="' + id + '">\n                            \n                        </div>';

    if (state.loggedIn) {
        // Logged in, reply comment form displayed
        commentTemp += '<form class="reply-comment-form comment-form expand" method="POST" action="/posts/comments">\n                            <textarea class="reply-comment-input comment-input" rows="" cols="" placeholder="Type your reply here . . ." required></textarea>\n                            <button class="reply-comment-btn" type="submit">Reply</button>\n                        </form>';
    }
    // close comment <div>'s  
    commentTemp += '</div>\n                 </div>';
    return commentTemp;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated reply comment template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getReplyCommentTemplate(comment, byThisUser, didUserLike) {
    var content = comment.content,
        username = comment.author.username,
        created = getElapsedTime(new Date(comment.created)),
        likes = comment.likes,
        commentId = comment.commentId,
        id = comment._id;
    var posNeg = '';
    if (likes < 0) posNeg = '&#45;';else if (likes > 0) posNeg = '+';
    return '<hr class="thin-hr">\n            <div class="reply-comment" data-this-id="' + id + '">\n                <p class="reply-comment-content gen-comment">' + content + '</p>\n                <div class="reply-comment-metadata">\n                    <span class="comment-user">- @' + username + '</span>\n                    <span class="date-posted">' + created + ' ' + (/\d/.test(created) ? 'ago' : '') + '</span>\n                    <div class="thumbs">\n                        <i class="like fa fa-thumbs-up" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                        <i class="dislike fa fa-thumbs-down" aria-hidden="true" data-user-liked="' + didUserLike + '"></i>\n                        <span class="posNeg">' + posNeg + '</span><span class="like-dislikes">' + likes + '</span>\n                    </div>\n                </div>\n            </div>';
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Template for model detail page specs
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getDetailPageSpecsTemplate(data) {
    return '<li>\n                <dl class="main-specs">\n                    <dt>Specs</dt>\n                    <dd>Avg. Price: <span>$' + data.price + '</span></dd>\n                    <dd>Camera: <span>' + data.camera + '</span></dd>\n                    <dd>Max Flight Time: <span class="">' + data.max_flight_time + '</span></dd>\n                    <dd>Max Range: <span>' + data.max_range + '</span></dd>\n                    <dd>Max Speed: <span>' + data.max_speed + '</span></dd>\n                    <dd>GPS?: <span>' + data.gps + '</span></dd>\n                    <dd>3-axis gimbal: <span>' + data.gimbal + '</span></dd>\n                    <dd>Flips: <span>' + (data.flips || 'NO') + '</span></dd>\n                </dl>\n            </li>\n            <li>\n                <dl class="mode-specs">\n                    <dt>Modes</dt>\n                    <dd>Intelligent Flight: <span>' + data.intelligent_flight + '</span></dd>\n                    <dd>Avoidance: <span>' + (data.avoidance || 'NO') + '</span></dd>\n                    <dd>Return Home: <span>' + (data.return_home || 'NO') + '</span></dd>\n                    <dd>Follow-Me Mode: <span>' + (data.follow_me_mode || 'NO') + '</span></dd>\n                    <dd>Tracking Mode: <span>' + (data.tracking_mode || 'NO') + '</span></dd>\n                </dl>\n            </li>';
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Template for each gallery video
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getGalleryTemplate(video) {
    var EMBED_URL = "https://www.youtube.com/embed";
    var imgUrl = video.snippet.thumbnails.medium.url,
        videoId = video.id.videoId,
        description = video.snippet.description;

    return '<div class="vid-wrap ' + (state.isMobile ? 'mobile-vid' : '') + '">\n                <div class="g-video ' + (state.isMobile ? 'mobile-vid' : '') + '">\n                    <img class="' + (state.isMobile ? 'hidden' : '') + '" \n                        src="' + imgUrl + '" \n                        alt="' + description + '" \n                        data-vid-url="' + EMBED_URL + '/' + videoId + '?enablejsapi=1">\n                    <iframe class="mobile-vid ' + (state.isMobile ? '' : 'hidden') + '"\n                        src="' + EMBED_URL + '/' + videoId + '?enablejsapi=1" \n                        data-alt="' + description + '" \n                        data-vid-url="' + EMBED_URL + '/' + videoId + '?enablejsapi=1"></iframe>\n                </div>\n            </div>';
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Updates the model detail specs depending on current slide
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailSpecs(currentSlide) {
    var $currentSlide = $('.drone-model[data-slick-index="' + currentSlide + '"]');
    var model = $currentSlide.attr('data-model'),
        make = $currentSlide.attr('data-make');
    // grab model data object from drones object

    var data = getDroneData(make, model),
        specHtml = getDetailPageSpecsTemplate(data);

    $(DETAIL_MODEL).text(data.model);
    $(DETAIL_MAKE).text(data.brand);
    $(DETAIL_LISTS).html(specHtml);
    $(AMAZON_LINK).html(data.link);
    updateDetailVideos($currentSlide);
    var $specs = $('.main-specs span').add('.mode-specs span');
    $specs.each(function (index) {
        if ($(this).text() === 'NO') {
            $(this).css({ color: 'black' });
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets videos from youtube api and updates current detail 
// page video gallery
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function updateDetailVideos($currentSlide) {
    var EMBED_URL = "https://www.youtube.com/embed";
    var make = $currentSlide.attr('data-cased-make'),
        model = $currentSlide.find('label').text();
    var query = make + ' ' + model;
    searchYoutubeVideos(query, function (res) {
        // Save reference to current query and next page of search results
        state.video.query = query;
        state.video.nextPageToken = res.nextPageToken;

        var vids = res.items;
        var mainVid = vids[0],
            g_vid_1 = vids[1],
            g_vid_2 = vids[2],
            g_vid_3 = vids[3],
            g_vid_4 = vids[4];

        $(MAIN_VID).attr('src', EMBED_URL + '/' + mainVid.id.videoId + '?enablejsapi=1&html5=1').attr('data-thumbnail', mainVid.snippet.thumbnails.medium.url).attr('data-alt', mainVid.snippet.description);

        $(G_VID_1).attr('src', '' + g_vid_1.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_1.id.videoId + '?enablejsapi=1').attr('alt', g_vid_1.snippet.description);

        $(G_VID_2).attr('src', '' + g_vid_2.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_2.id.videoId + '?enablejsapi=1').attr('alt', g_vid_2.snippet.description);

        $(G_VID_3).attr('src', '' + g_vid_3.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_3.id.videoId + '?enablejsapi=1').attr('alt', g_vid_3.snippet.description);

        $(G_VID_4).attr('src', '' + g_vid_4.snippet.thumbnails.medium.url).attr('data-vid-url', EMBED_URL + '/' + g_vid_4.id.videoId + '?enablejsapi=1').attr('alt', g_vid_4.snippet.description);

        nextSearchPageHandler(); // Load videos in 'checkout more' section
    }, 5);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handles swapping videos between right side gallery
// and the main video on left.
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function videoGalleryHandler($img) {
    var vidUrl = $img.attr('data-vid-url'),
        thumbUrl = $img.attr('src'),
        alt = $img.attr('alt');
    var mainVidUrl = $(MAIN_VID).attr('src'),
        mainVidThumbUrl = $(MAIN_VID).attr('data-thumbnail'),
        mainVidAlt = $(MAIN_VID).attr('data-alt');
    // swap videos
    $(MAIN_VID).attr('src', vidUrl);
    $(MAIN_VID).attr('data-alt', alt);
    $(MAIN_VID).attr('data-thumbnail', thumbUrl);

    $img.attr('src', mainVidThumbUrl);
    $img.attr('alt', mainVidAlt);
    $img.attr('data-vid-url', mainVidUrl);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Creates video elements for each video and appends to
// gallery-content area
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayMoreVideos(videos) {
    var frames = videos.map(function (video) {
        return getGalleryTemplate(video);
    });
    $('.more-content').append(frames.join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Opens video modal and plays video from current time
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function openVideoModal(url) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    show(VIDEO_BACKDROP);
    $('body').addClass('no-scroll');
    $(MODAL_IFRAME).attr('src', url + '&start=' + time + '&autoplay=1');
    $(MAIN_VID).attr('src', url);
    $(MODAL_IFRAME).attr('data-index', index);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// closes video modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeVideoModal() {
    hide(VIDEO_BACKDROP);
    $('body').removeClass('no-scroll');
    $(MODAL_IFRAME).attr('src', '');
    $(MODAL_IFRAME).attr('data-index', '');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Modal Video navigation controller for MAIN gallery
// uses main video iframe url and the four gallery img urls
// for 5 possible choices for video navigation
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function mainModalNavController(nextVideo) {
    var imgs = [$('.g-top-left img'), $('.g-top-right img'), $('.g-bottom-left img'), $('.g-bottom-right img')];
    var currentIndex = parseInt($(MODAL_IFRAME).attr('data-index')),
        nextUrl = void 0,
        nextIndex = void 0;
    if (nextVideo === 'next') {
        if (currentIndex === 3) {
            // end of videos met
            alert('Go back to checkout more videos!');
            return; // do nothing
        }
        if (currentIndex === -1) {
            // current modal video is from main iframe, get first gallery img url
            nextUrl = imgs[0].attr('data-vid-url');
            nextIndex = 0;
        } else {
            nextIndex = currentIndex + 1;
            nextUrl = imgs[nextIndex].attr('data-vid-url');
        }
    } else {
        if (currentIndex === -1) {
            // beginning of videos met
            alert('Go back to checkout more videos!');
            return; // do nothing
        }
        if (currentIndex === 0) {
            nextUrl = $(MAIN_VID).attr('src'); // current modal video is first gallery img url, get main iframe url
            nextIndex = -1;
        } else {
            nextIndex = currentIndex - 1;
            nextUrl = imgs[nextIndex].attr('data-vid-url');
        }
    }
    $(MODAL_IFRAME).attr('src', nextUrl + '&autoplay=1');
    $(MODAL_IFRAME).attr('data-index', nextIndex);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Modal Video navigation controller for SUB gallery
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function modalVideoNavController(nextVideo) {
    var currentIndex = parseInt($(MODAL_IFRAME).attr('data-index'));

    var next = nextVideo === 'next' ? currentIndex + 1 : currentIndex - 1;
    var url = $('.more-content .vid-wrap:nth-of-type(' + (next + 1) + ')').find('img').attr('data-vid-url');

    if (next > $('.more-content img').length - 1 || next < 0) {
        next < 0 ? alert('Click next arrow for more') : alert('Click prev arrow for more');
    } else {
        $(MODAL_IFRAME).attr('src', url + '&autoplay=1');
        $(MODAL_IFRAME).attr('data-index', next);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays current posts in db to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPosts(_posts) {
    var posts = _posts.map(function (post) {
        var specs = getDroneData(post.drone.make, post.drone.model);
        _extends(post, { specs: specs });

        // check if current session user voted on this post
        var usersVoted = post.usersVoted;
        var didUserVote = usersVoted.find(function (user) {
            return user === state.user;
        });

        // Check if post is by the current session user
        var byThisUser = false;
        if (post.author.username === state.user) {
            byThisUser = true;
        }
        return formReviewPost(post, byThisUser, didUserVote);
    });

    // Need to append when fetching batch at a time
    var postsStr = posts.reverse().join('');
    $(REVIEWS_CONTENT).html(postsStr);

    var $specs = $('.main-specs span').add('.mode-specs span');
    $specs.each(function (index) {
        if ($(this).text() === 'NO') {
            $(this).css({ color: 'black' });
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Updates DOM with current comment without requiring
// page refresh
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayComment(comment) {
    if ('postId' in comment) {
        // Main comments
        var postId = comment.postId;
        var commentHtml = getCommentTemplate(comment);
        var $commentsContent = $(COMMENTS_CONTENT + '[data-post-id="' + postId + '"]');

        var $numComments = $commentsContent.parent(COMMENTS_CONTAINER).find(NUM_COMMENTS);
        var count = parseInt($numComments.text());

        count++;
        $numComments.text(count);

        $commentsContent.append(commentHtml);
    } else {
        // Reply comments
        var commentId = comment.commentId;
        var _commentHtml = getReplyCommentTemplate(comment);
        $('.reply-comments-content[data-comment-id=' + commentId + ']').append(_commentHtml);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Opens login/signup modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function openLoginSignupModal(screen) {
    show(LOGIN_SIGNUP_PAGE);
    setTimeout(function () {
        $(LOGIN_SIGNUP_PAGE).addClass('slide');
        $(LOGIN_SIGNUP_MODAL).addClass('slide');
    }, 200);
    screen === 'login' ? displayLoginForm() : displaySignupForm();
    $('body').addClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Closes login/signup modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeLoginSignupModal() {
    $(LOGIN_SIGNUP_MODAL).removeClass('slide');
    setTimeout(function () {
        $(LOGIN_SIGNUP_PAGE).removeClass('slide');
    }, 200);

    setTimeout(function () {
        hide(LOGIN_SIGNUP_PAGE);
    }, 800);

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
    var err = message;
    show(SIGNUP_ERROR);
    if (location === 'email') {
        $(EMAIL_INPUT).addClass('error').val('').focus();
    } else if (location === 'username') {
        $('.signup-form ' + USERNAME_INPUT).addClass('error').val('').focus();
    } else if (location === 'password') {
        location = location[0].toUpperCase() + location.slice(1);
        err = location + ': ' + message;
        $(PASS_INPUT).addClass('error');
        $(PASS_INPUT)[0].focus();
    }
    $(PASS_INPUT).val('');
    $(SIGNUP_ERROR + ' .error-message').text(err);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays errors from login in modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayLoginError(message) {
    openLoginSignupModal('login');
    show(LOGIN_ERROR);
    $(LOGIN_ERROR + ' .error-message').text(message);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Slides review form in from top of screen, fades in 
// background
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function slideInReviewForm($nav, SCREEN) {
    var delay = $nav.hasClass('mobile-write') ? 500 : 0; // if click comes from mobile menu, delay so menu closes before form opens
    var modalDelay = state.isMobile ? 100 : 400,
        screenDelay = state.isMobile ? 0 : 100;

    setTimeout(function () {
        show(SCREEN);

        setTimeout(function () {
            $(SCREEN).addClass('fade-in');
        }, screenDelay);

        setTimeout(function () {
            $('.review-form-modal').addClass('slide');
        }, modalDelay);

        $('body').addClass('no-scroll');
    }, delay);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Slides review form up out of view, fades out
// background
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function slideUpReviewForm() {
    $('.review-form-modal').removeClass('slide');
    $(REVIEW_FORM_SCREEN).removeClass('fade-in');
    $(EDIT_REVIEW_FORM_SCREEN).removeClass('fade-in');

    var screenDelay = state.isMobile ? 400 : 800;
    setTimeout(function () {
        hide(REVIEW_FORM_SCREEN);
        hide(EDIT_REVIEW_FORM_SCREEN);
    }, screenDelay);

    $('body').removeClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays EDIT review post modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayEditPostForm($post) {
    var content = $post.find('.content').html(),
        postTitle = $post.find('.post-title').text(),
        id = $post.attr('data-post-id'),
        model = $post.attr('data-drone-model'),
        rating = $post.find('.post-rating').attr('data-rating');

    // Removes <p> tags and adds '\n\n' chars to end of each paragraph
    // to display text in form the same way it is displayed on screen
    content = content.split('<p class="paragraph">').join('').split('</p>').map(function (para) {
        return para += '\n\n';
    }).join('').trim();

    slideInReviewForm($(EDIT_REVIEW_FORM_SCREEN), EDIT_REVIEW_FORM_SCREEN);

    $('#edit-title-input').val(postTitle);
    $('#edit-post-content').val(content);
    $('.dropdown-options option[value="' + model + '"]').prop('selected', true);
    $(EDIT_REVIEW_FORM).attr('data-post-id', id);
    var $stars = $(EDIT_REVIEW_FORM).find('.star');
    $stars.each(function (index, el) {
        // order of indicies is reverse
        if (index > 5 - rating - 1) {
            $(el).addClass('filled-star');
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Populates drone dropdown selector with all current models
// stored in drones object. Now you only have to update one
// place in code to add new drone options to form
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fillDroneOptGroups() {
    $('.dropdown-options').empty();
    for (var make in drones) {
        var models = [];
        var displayMake = void 0;
        for (var model in drones[make]) {
            var specs = drones[make][model];
            displayMake === undefined ? displayMake = specs.brand : null;
            var option = '<option value="' + model + '">' + specs.model + '</option>';
            models.push(option);
        }
        var optGroup = '<optgroup label="' + displayMake + '">\n                            ' + models.join('') + '\n                        </optgroup>';
        $('.dropdown-options').append(optGroup);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) comments for given post
// and hides Specs if open
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleComments(commentsBtn) {
    var $review = $(commentsBtn).parents(REVIEW),
        $commentSection = $review.find(COMMENTS_CONTAINER),
        $details = $review.find(DETAILS),
        $specs_btn = $review.find(SPECS_BTN);

    var delay = 0;
    if ($details.hasClass('expand')) {
        delay = 100;
    }
    $details.removeClass('expand');
    $specs_btn.removeClass('btn-active');
    setTimeout(function () {
        $commentSection.toggleClass('expand');
        $(commentsBtn).toggleClass('btn-active');
    }, delay);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) specs for given post
// and hides comments if open
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleSpecs(specBtn) {
    var $review = $(specBtn).parents(REVIEW),
        $details = $review.find(DETAILS),
        $commentSection = $review.find(COMMENTS_CONTAINER),
        $commentS_btn = $review.find(COMMENTS_BTN);
    var delay = 0;
    if ($commentSection.hasClass('expand')) {
        delay = 100;
    }
    $commentSection.removeClass('expand');
    $commentS_btn.removeClass('btn-active');
    setTimeout(function () {
        $details.toggleClass('expand');
        $(specBtn).toggleClass('btn-active');
    }, delay);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Toggles (shows/hides) mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleMobileMenu() {
    $(MOBILE_MENU).toggleClass('open');
    $(BURGER_WRAP).toggleClass('open');
    $(BURGER_ICON).toggleClass('open');
    $('body').toggleClass('no-scroll'); // Sends user to top of page
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Hides mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeMobileMenu() {
    $(MOBILE_MENU).removeClass('open');
    $(BURGER_WRAP).removeClass('open');
    $(BURGER_ICON).removeClass('open');
    $('body').removeClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Adds hidden class to all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hide() {
    Object.values(arguments).forEach(function (target) {
        $(target).addClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Removes hidden class from all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function show() {
    Object.values(arguments).forEach(function (target) {
        $(target).removeClass('hidden');
    });
}

//================================================================================
// API handlers / Display handlers
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handles clicks on drone banner and redirects
// to corresponding drone brand endpoint
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function droneBannerHandler($droneMake) {
    var brand = $droneMake.attr('id');
    var url = '/drones/' + brand;
    location.href = url;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects user signup data and submits it to server
// to create a new user
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function signupFormHandler($form) {
    var email = $form.find('.email-input').val(),
        username = $form.find('.username-input').val(),
        password = $form.find(PASS_INPUT).val(),
        rePassword = $form.find('.re-pass-input').val();
    resetLoginForm();
    if (password !== rePassword) {
        alert('passwords did not match.');
        $('.signup-form ' + PASS_INPUT).addClass('error');
    } else {
        $('.signup-form ' + PASS_INPUT).removeClass('error');
        closeLoginSignupModal();
        var data = { email: email, username: username, password: password };
        setTimeout(function () {
            createNewUser(data); // makes call to api
        }, 1000);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Resets signup form and removes any error messages
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function resetSignupForm() {
    $(SIGNUP_FORM + ' ' + USERNAME_INPUT).removeClass('error');
    hide(SIGNUP_ERROR);
    $(SIGNUP_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects username and password from user and 
// calls ajax function to attempt to log user in to session
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function loginFormHandler($form) {
    var username = $form.find('.username-input').val(),
        password = $form.find(PASS_INPUT).val();
    var data = { username: username, password: password };

    resetSignupForm();
    closeLoginSignupModal();
    setTimeout(function () {
        logUserIn(data); // makes call to api
    }, 1000);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Resets login form and removes any error messages
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function resetLoginForm() {
    hide(LOGIN_ERROR);
    $(LOGIN_FORM + ' ' + PASS_INPUT).removeClass('error');
    $(LOGIN_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function reviewFormHandler($form) {
    var editForm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var $selectedOpt = $($form).find('.dropdown-options').find(":selected");
    var make = $selectedOpt.parent().attr('label').toLowerCase(),
        model = $selectedOpt[0].value,
        title = $('#title-input').val(),
        content = $('#post-content').val(),
        rating = $form.find('.filled-star').length;

    var $fileInput = $form.find('.img-file-input');
    var file = $fileInput.val() !== undefined ? $fileInput[0].files[0] : null;

    content = content.split('\n\n');

    var post = {
        drone: { make: make, model: model },
        title: title,
        content: content,
        rating: rating
    };

    if (rating === undefined || rating === 0) {
        show('.rating-alert');
    } else {
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
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Formulates review post for preview before actually 
// submitting
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function previewReviewHandler($form) {
    var form = $form.is(REVIEW_FORM) ? REVIEW_FORM : EDIT_REVIEW_FORM;
    var elements = $(form)[0].elements,
        $selectedOpt = $(elements["make"]).find(":selected"),
        droneMake = $selectedOpt.parent().attr('label'),
        droneModel = $selectedOpt[0].value,
        droneData = getDroneData(droneMake, droneModel),
        title = elements['title'].value,
        content = elements['content'].value,
        user = state.user,
        post = { user: user, droneData: droneData, title: title, content: content };

    content = content.split('\n\n'); // Create array of strings, one per paragraph


    // MAKE sure text going into edit review mode doesnt have <p> already 

    var postData = {
        title: title,
        content: content,
        author: user,
        img: droneData.img,
        drone: {
            make: droneData.brand,
            model: droneData.model
        },
        specs: droneData,
        created: Date.now()
    };

    var postHtml = formReviewPost(postData);
    show(PREVIEW_SCREEN);
    $(PREVIEW_CONTENT).html(postHtml);
    $(PREVIEW_CONTENT).find(INTERACTIONS).remove();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from comment form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function commentFormHandler($form) {
    var url = $form.attr('action'),
        content = $form.find('.comment-input').val(),
        postId = $form.siblings(COMMENTS_CONTENT).attr('data-post-id'),
        username = state.user;
    var created = Date.now();
    var comment = {
        url: url,
        content: content,
        author: { username: username },
        created: created
    };

    if ($form.hasClass('reply-comment-form')) {
        comment['commentId'] = $form.closest('.comment').attr('data-this-id');
    } else if (postId !== undefined) {
        comment.postId = postId;
    }
    // call to ajax POST method
    postComment(comment);
    // reset form after submit
    $form[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Looks up and returns data object on given drone
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getDroneData(make, model) {
    make = make.toLowerCase();
    return drones[make][model];
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Filters reviews 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function filterReviewHandler() {
    // Get checked radio
    var target = $('input[name="filter"]:checked', FILTER_FORM).val();
    // loop through DOM and check if any matches
    // if yes, loop through DOM and remove reviews that dont match
    var isMatch = false;
    $(REVIEWS_CONTENT).find(REVIEW).each(function (index, review) {
        var make = $(this).find('.maker').first().text().toLowerCase();
        if (make.indexOf(target) >= 0) {
            isMatch = true;
            return;
        }
    });
    if (isMatch) {
        $(REVIEWS_CONTENT).find(REVIEW).each(function (index, review) {
            var make = $(this).find('.maker').first().text().toLowerCase();
            var $hr = $(this).prev('hr');
            if (make.indexOf(target) === -1) {
                $(this).add($hr).hide();
            } else {
                $(this).add($hr).show();
            }
        });
        $(REVIEW + ':visible').first().prev('hr').hide(); // removes <hr> from top of filtered reviews
        show(FILTER_STATUS);
        $(USER_FILTER).text(droneBrands[target]);
    } else {
        // display message, no reviews matching
        console.log('No Match');
        show(FILTER_ALERT);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Search reviews filter
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function searchFilterHandler() {
    hide(QUERY_ERROR_MESSAGE);
    // user input
    var baseQuery = $(SEARCH_FILTER).val().trim();
    // grab each search keyword
    var query = baseQuery.toLowerCase().split(' ');

    var resultFound = false;
    $(REVIEWS_CONTENT).find(REVIEW).each(function (index, review) {
        var make = $(this).find('.maker').first().text().toLowerCase();
        var model = $(this).find('.model').first().text().toLowerCase();
        var $hr = $(this).prev('hr');

        var found = query.map(function (keyword) {
            if (make.indexOf(keyword) >= 0 || model.indexOf(keyword) >= 0) {
                return 1;
            }
        });
        if (found.indexOf(1) === -1) {
            $(review).add($hr).hide();
        } else {
            $(review).add($hr).show();
            resultFound = true;
        }
    });
    $(USER_QUERY).text(baseQuery);
    if (resultFound) {
        show(QUERY_TEXT);
        $(REVIEW + ':visible').first().prev('hr').hide();
    } else {
        show(QUERY_ERROR_MESSAGE);
    }
    $(SEARCH_FILTER_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Bundles comments and displays them in
// the associated post's comment section
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function commentsFromDbHandler(comments) {
    var mainComments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var id = arguments[2];


    if (mainComments) {
        var postId = comments[0].postId;
        var commentsHtml = comments.map(function (comment) {
            var _checkIfFromCurrentUs = checkIfFromCurrentUser(comment),
                byThisUser = _checkIfFromCurrentUs.byThisUser,
                didUserLike = _checkIfFromCurrentUs.didUserLike;

            return getCommentTemplate(comment, byThisUser, didUserLike);
        });
        var numComments = commentsHtml.length;
        var $commentsContent = $(COMMENTS_CONTENT + '[data-post-id="' + postId + '"]');

        $commentsContent.parent(COMMENTS_CONTAINER).find(NUM_COMMENTS).text(numComments);
        // Find comments-content by data-id and append 
        $commentsContent.append(commentsHtml.join(''));

        // Make additional calls to db to fetch each reply comment
        comments.forEach(function (comment) {
            getCommentsFromDb(comment.id, false);
        });
    } else {
        var commentId = id;
        var _commentsHtml = comments.map(function (comment) {
            var _checkIfFromCurrentUs2 = checkIfFromCurrentUser(comment),
                byThisUser = _checkIfFromCurrentUs2.byThisUser,
                didUserLike = _checkIfFromCurrentUs2.didUserLike;

            return getReplyCommentTemplate(comment, byThisUser, didUserLike);
        });

        $(REPLY_COMMENT_CONTENT + '[data-comment-id="' + commentId + '"]').append(_commentsHtml.join(''));
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
    var usersLiked = comment.usersLiked;
    var didUserLike = usersLiked.find(function (user) {
        return user === state.user;
    });
    // Check if post is by the current session user
    var byThisUser = false;
    if (comment.author.username === state.user) {
        byThisUser = true;
    }

    return { byThisUser: byThisUser, didUserLike: didUserLike };
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Sets img from db to corresponding post  
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function addImgToPostHandler(imgRes) {
    var postId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    $(REVIEWS).find('.post[data-post-id="' + postId + '"]').find('.post-img').attr('src', imgRes.url);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays posts to screen and makes call for each
// post's comments
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function postsHandler(posts) {

    displayPosts(posts);
    // Make call to api to get comments for each post
    posts.forEach(function (post) {
        if (post.imgId !== '') {
            getFile(post.imgId, post.id);
        }
        getCommentsFromDb(post.id);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Upvote / Downvote post handler
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function voteOnPost($voteBtn) {
    var upVote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if ($voteBtn.attr('data-user-voted') === state.user) {
        alert('Already voted');
        return;
    }

    var $votes = $voteBtn.siblings(VOTES),
        $posNeg = $voteBtn.siblings(POSNEG),
        count = parseInt($votes.text()),
        postId = $voteBtn.closest('.post').attr('data-post-id'),
        posNeg = '';

    upVote ? ++count : --count;
    if (count < 0) posNeg = '&#45;';else if (count > 0) posNeg = '+';

    $posNeg.html(posNeg);
    $votes.text(count);
    $voteBtn.attr('data-user-voted', state.user);

    getPostById(postId, function (res) {
        var usersArr = res.usersVoted;
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
function likeDislikeComment($btn) {
    var like = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if ($btn.attr('data-user-liked') === state.user) {
        alert('Already like');
        return;
    }

    var $likes = $btn.siblings(LIKES),
        $posNeg = $btn.siblings(POSNEG),
        count = parseInt($likes.text()),
        commentId = $btn.closest('.gen-comment').attr('data-this-id'),
        posNeg = '';

    like ? ++count : --count;
    if (count < 0) posNeg = '&#45;';else if (count > 0) posNeg = '+';

    $posNeg.html(posNeg);
    $likes.text(count);
    $btn.attr('data-user-liked', state.user);
    $btn.siblings('i').attr('data-user-liked', state.user);

    getCommentById(commentId, function (res) {
        var usersArr = res.usersLiked;
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
    var updateData = {
        id: postId,
        imgId: file.file._id
    };
    updatePost(updateData);
}

function nextSearchPageHandler() {
    var q = state.video.query,
        token = state.video.nextPageToken;
    searchYoutubeNextPage(q, token, function (res) {
        state.video.nextPageToken = res.nextPageToken;
        displayMoreVideos(res.items);
    }, 6);
}

//================================================================================
// API calls
//================================================================================

// USERS 

// sign-up
function createNewUser(userData) {
    $.ajax({
        url: '/users',
        type: 'POST',
        dataType: 'json',
        data: userData,
        success: function success(res) {
            // Successfully signed user up, now log them in
            resetSignupForm();
            openLoginSignupModal('login');
            displayWelcomeMessage(res.username);
        },
        error: function error(err) {
            var message = err.responseJSON.message;
            var location = err.responseJSON.location;
            console.log(location + ': ' + message);
            show(LOGIN_SIGNUP_PAGE);
            displaySignupError(location, message);
        }
    });
}

// Log In
function logUserIn(loginData) {
    // console.log(loginData);
    $.ajax({
        url: '/users/login',
        type: 'POST',
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
            // Send basic auth, uri-encoded header with request
            xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(loginData.username + ':' + loginData.password))));
        },
        success: function success(res) {
            if (res.status) {
                location.reload();
            } else {
                displayLoginError(res.message);
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// Log Out
function logUserOut() {
    $.ajax({
        url: '/users/logout',
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            location.reload();
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// POSTS

function getPostsFromDb() {
    $.ajax({
        url: "/posts",
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            postsHandler(res.posts);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function getPostById(id, callback) {
    return $.ajax({
        url: '/posts/' + id,
        type: 'GET',
        dataType: 'json',
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function createPost(postData, file) {
    $.ajax({
        url: '/posts',
        type: 'POST',
        dataType: 'json',
        data: postData,
        success: function success(res) {
            if (file) {
                uploadFile(file, res.id);
            } else {
                location.reload();
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function updatePost(updateData, file) {
    var id = updateData.id;
    $.ajax({
        url: '/posts/' + id,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: function success(res) {
            if (file) {
                if (res.imgId !== "") {
                    deleteFile(res.imgId);
                }
                uploadFile(file, res.id);
            } else {
                if (res.hasOwnProperty('title') && !updateData.hasOwnProperty('votes')) location.reload();
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function deletePost(id) {
    $.ajax({
        url: '/posts/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function success(res) {
            location.reload();
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// FILES

function uploadFile(blobFile, postId) {
    var formData = new FormData();
    formData.append('file', blobFile);

    $.ajax({
        url: '/file/img',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function success(res) {
            fileUploadHandler(res, postId);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function getFile(id, postId) {
    $.ajax({
        url: '/file/img/' + id,
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            addImgToPostHandler(res, postId);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function deleteFile(id) {
    $.ajax({
        url: '/file/img/' + id,
        type: "DELETE",
        success: function success(res) {
            // console.log(`successfully deleted img(${id})`);
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// COMMENTS

function getCommentsFromDb(id) {
    var mainComments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var url = void 0;
    if (mainComments) {
        url = '/posts/' + id + '/comments';
    } else {
        url = '/posts/comments/' + id + '/comments';
    }
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            if (res.comments.length > 0) {
                //  Main comment                //  Reply comment
                mainComments ? commentsFromDbHandler(res.comments) : commentsFromDbHandler(res.comments, false, id);
            }
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function getCommentById(id, callback) {
    $.ajax({
        url: '/posts/comments/' + id,
        type: 'GET',
        dataType: 'json',
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function postComment(commentObj) {
    $.ajax({
        url: "/posts/comments",
        type: 'POST',
        dataType: 'json',
        data: commentObj,
        success: displayComment,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function updateComment(updateData) {
    var id = updateData.id;
    $.ajax({
        url: '/posts/comments/' + id,
        type: 'PUT',
        dataType: 'json',
        data: updateData,
        success: function success(res) {
            console.log('Success');
            console.log({ res: res });
        },
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// YoutTube API calls
// * * * * * * * * * * * * * * * * * * * * * * * * *
var YOUTUBE_KEY = 'AIzaSyCSyc7hnCXopqsh5Z9HlklFAK3gvteRMAY';
var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';

function searchYoutubeVideos() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : printToConsole;
    var maxResults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    $.ajax({
        url: YOUTUBE_URL + '/search/',
        type: 'GET',
        dataType: 'json',
        data: {
            maxResults: maxResults,
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: query
        },
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

function searchYoutubeNextPage(query, pageToken) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : printToConsole;
    var maxResults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

    $.ajax({
        url: YOUTUBE_URL + '/search/',
        type: 'GET',
        dataType: 'json',
        data: {
            maxResults: maxResults,
            pageToken: pageToken,
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: query

        },
        success: callback,
        error: function error(jqXHR, textStatus, err) {
            console.log(err);
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// API Utility, prints response to console
// * * * * * * * * * * * * * * * * * * * * * * * * *
function printToConsole(res) {
    console.log(res);
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
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 860,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 580,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 415,
            settings: {
                speed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1,
                cssEase: 'ease-in-out'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        }]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Drone Models carousel
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initDroneModelsSlider() {
    $(DRONE_MODELS_SLIDER).slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [{
            breakpoint: 440,
            settings: {
                dots: false
            }
        }]
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

function displayDroneModelsSlider() {
    $('.slick-slider').css('height', '0px');
    initDroneModelsSlider();
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
        var width = parseInt($('body').css('width'));
        if (!$(DRONE_SLIDER).hasClass('slick-initialized')) {
            initDroneSlider();
        }
        if (!$(DRONE_MODELS_SLIDER).hasClass('slick-initialized')) {
            initDroneModelsSlider();
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
function smoothScroll(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1200;
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    $(document).ready(function () {
        checkSize();
        $(window).resize(checkSize);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Called by checkSizeHandler to set state if mobile view
// or not and hide/show thumbnail image or iframe of video
// depending on mobile state. Also, swaps the position of
// the main video player and gallery depending on size
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSize() {
    parseInt($("body").css('width')) <= 414 ? state.isMobile = true : state.isMobile = false;

    navUserMsgHandler();

    if (window.location.href.indexOf('drones') >= 0) {

        if (parseInt($("body").css('width')) <= 400) {
            hide('.more-content img');
            show('.more-content iframe');
            $('.more-content .vid-wrap').addClass('mobile-vid');
        } else {
            hide('.more-content iframe');
            show('.more-content img');
            $('.more-content .vid-wrap').removeClass('mobile-vid');
        }

        if (parseInt($("body").css('width')) <= 720) {
            if (!$(GALLERY).prev().is(SHOWCASE)) {
                $(SHOWCASE).detach().insertBefore(GALLERY);
            }
        } else {
            if (!$(GALLERY).next().is(SHOWCASE)) {
                $(SHOWCASE).detach().insertAfter(GALLERY);
            }
        }
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Shows / hides mobile user message so mobile users can
// confirm they are logged in and limits the username
// to fit within alotted space
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function navUserMsgHandler() {
    if (parseInt($("body").css('width')) < 585) {
        show('.mobile-msg');
    } else {
        hide('.mobile-msg');
    }

    if (parseInt($("body").css('width')) > 700) {
        limitNavUserMessage();
    } else {
        limitNavUserMessage(6);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// limits the username in message to provided limit, 10
// char is the default max-length
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function limitNavUserMessage() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    var username = state.user;
    if (username.length > limit) {
        username = username.slice(0, limit - 1);
        $('.user-nav .user-loggedin').text(username + '..');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fixes banner nav to top of screen on scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// function fixBannerNav() {
//     $(window).scroll((e) => {
//         let scroll = $(window).scrollTop();
//         console.log(scroll);
//         if (scroll >= $('main').offset().top) {
//             $(BANNER_WRAP).addClass('fixed-nav');
//         } else {
//             $(BANNER_WRAP).removeClass('fixed-nav');
//         }
//     });
// }


function fixBannerNav() {
    $(window).scroll(function (e) {
        var scroll = $(window).scrollTop(),
            offset = $('main').offset().top;

        if (scroll >= offset) {
            // past header

            if (state.isMobile) {
                scroll > state.prevScrollPos ? state.downScrollPos = scroll : null; // save position when upward scroll begins

                if (state.downScrollPos - scroll >= 50) {
                    $(BANNER_WRAP).addClass('fixed-nav'); // fix the nav on upward scroll
                    $(BANNER_WRAP).fadeIn(); // fades nav in if previously faded out
                } else {
                    $(BANNER_WRAP).fadeOut(300); // fades nav out on downward scroll
                }
            } else {
                $(BANNER_WRAP).addClass('fixed-nav'); // not mobile, fix nav
            }
        } else {
            $(BANNER_WRAP).removeClass('fixed-nav');
            $(BANNER_WRAP).show(); // show in case it is faded out
        }
        state.prevScrollPos = scroll; // set scroll pos to compare on next scroll
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Calculates time elapsed since date given and returns
// the appropriate time unit, rounding down to nearest whole
// number 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getElapsedTime(prevDate) {
    var diff = Date.now() - prevDate,
        min = Math.floor(diff / 60000),
        // 60,000 ms / min
    hrs = Math.floor(diff / 3600000),
        // 3,600,000 ms / hr
    days = Math.floor(diff / 86400000),
        // 6,400,000 ms / day
    months = Math.floor(diff / 2629746000),
        // 2629746000 ms / month
    years = Math.floor(diff / 31556952000); // 31,556,952,000 ms / year

    if (min < 60) {
        if (min < 1) return 'just now';else if (min === 1) return 'a minute ago';else return min + ' minutes';
    } else if (hrs < 24) {
        return hrs + ' ' + (hrs === 1 ? 'hour' : 'hours');
    } else if (days < 31) {
        return days + ' ' + (days === 1 ? 'day' : 'days');
    } else if (months < 12) {
        return months + ' ' + (months === 1 ? 'month' : 'months');
    } else {
        return years + ' ' + (years === 1 ? 'year' : 'years');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// If endpoint has #reviews, smooth scrool to reviews section
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hashUrlHandler() {
    if (location.hash === '#reviews') {
        smoothScroll(REVIEWS);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Checks current endpoint on page load to display correct
// elements and styling for given page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkEndpoint() {
    var endpoint = window.location.pathname;
    if (endpoint.indexOf('drones') >= 0) {
        $('#main-header').removeClass('banner').addClass('drone-header');
        hide('.landing-greeting');
        $('.drone-list a[href="' + endpoint + '"]').addClass('current-page');
        $('.drone-list a[href="' + endpoint + '"]').parent().addClass('current-page');
    } else if (endpoint.indexOf('mission') >= 0) {
        show('.mission-container');
        hide('.greeting');
    }
}

function checkIfUserLoggedIn() {
    if (!state.loggedIn) {
        hide('.logged-in');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// If a user is logged in, display their username in nav
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayCurrentUser() {
    if (state.user !== '') {
        $('.user-loggedin').text(state.user);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets reference to iframe 'showcase' video player
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function onYouTubeIframeAPIReady() {
    state.player = new YT.Player('main-iframe', {
        events: {
            'onReady': function onReady() {
                console.log("Main Player Ready!!");
            },
            'onStateChange': function onStateChange() {
                console.log("Main Player state changed");
            }
        }
    });
}

//================================================================================
// Event Listeners
//================================================================================

// * * * * * * * * * * * * *
//   Nav item clicks
// * * * * * * * * * * * * * 
function burgerMenuClick() {
    $(BURGER_ANCHOR).on('click', function (e) {
        e.preventDefault();
        toggleMobileMenu();
    });
}

function burgerIconTouchend() {
    $(BURGER_ANCHOR).on('touchstart', function (e) {
        $(BURGER_ICON).addClass('touchstart');
        $(BURGER_ICON).removeClass('touchend');
    });
    $(BURGER_ANCHOR).on('touchend', function (e) {
        $(BURGER_ICON).removeClass('touchstart');
        $(BURGER_ICON).addClass('touchend');
    });
}

function mobileMenuItemClick() {
    $(MOBILE_MENU_ITEM).on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('coming-soon')) {
            return;
        } else if ($(this).hasClass('write-review') && state.loggedIn === false) {
            return;
        } else {
            closeMobileMenu();
        }
    });
}

function reviewsNavItemClick() {
    $(REVIEWS_NAV_ITEM).on('click', function (e) {
        e.preventDefault();
        if (location.pathname !== '/') {
            window.location = '/#reviews';
        }
        smoothScroll('#reviews');
    });
}

function homeClick() {
    $('.home').on('click', function (e) {
        e.preventDefault();
        window.location = '/';
    });
}

function welcomeClick() {
    $('.welcome').on('click', function (e) {
        e.preventDefault();
        location.href = '/welcome';
    });
}

// * * * * * * * * * * * * * 
//   Drone banner clicks
// * * * * * * * * * * * * * 
function droneBannerClicks() {
    $('.drone-make').on('click', function (e) {
        e.preventDefault();
        droneBannerHandler($(this));
    });
}

function droneModelSlideChange() {
    $(DRONE_MODELS_SLIDER).on('afterChange', function (e, slick, currentSlide) {
        e.preventDefault();
        $('.more-content').empty();
        displayDetailSpecs(currentSlide);
    });
}

// * * * * * * * * * * * * * 
//   Login modal btn
// * * * * * * * * * * * * * 
function loginBtnsClick() {
    // main nav login-btn
    $(LOGIN_BTN).on('click', function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('login');
    });
    // comments login-btn
    $(REVIEWS).on('click', SUB_LOGIN_BTN, function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('login');
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
    $(LOGOUT_BTN).on('click', function (e) {
        e.preventDefault();
        var delay = parseInt($('body').css('width')) < 585 ? 650 : 0;
        setTimeout(function () {
            logUserOut();
        }, delay);
    });
}

// * * * * * * * * * * * * * 
// Signup modal btn
// * * * * * * * * * * * * * 
function signupBtnsClick() {
    // main nav signup-btn
    $(SIGNUP_BTN).on('click', function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('signup');
    });
    // comments signup-btn
    $(REVIEWS).on('click', SUB_SIGNUP_BTN, function (e) {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('signup');
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
    $(window).on('click', function (e) {
        if (e.target === $(LOGIN_SIGNUP_PAGE)[0] || e.target === $(LOGIN_SIGNUP_X)[0]) {
            closeLoginSignupModal();
        }
    });
}

// * * * * * * * * * * * * * 
// Aside Filter
// * * * * * * * * * * * * * 
function asideFilterBtnHover() {
    $(ASIDE_BTN).mouseenter(function (e) {
        e.preventDefault();
        $(ASIDE_CONTAINER).addClass('slide');
        $('.aside-chevron').addClass('flip');
    });

    $(ASIDE_BTN).on('click', function (e) {
        e.preventDefault();
        $(ASIDE_CONTAINER).removeClass('slide');
        $('.aside-chevron').removeClass('flip');
    });
}

//
// Search Filter Form SUBMIT
//
function searchFilterFormSubmit() {
    $(SEARCH_FILTER_FORM).submit(function (e) {
        e.preventDefault();
        hide(FILTER_ALERT, FILTER_STATUS);
        searchFilterHandler();
    });
}

//
// Clear filters -- show all reviews
//
function clearAsideFiltersClick() {
    $('.clear-btn').on('click', function (e) {
        e.preventDefault();
        console.log('click');
        hide(FILTER_ALERT, FILTER_STATUS, QUERY_ERROR_MESSAGE, QUERY_TEXT);
        $(REVIEW).add($('.post-hr')).show();

        $('#radio-filter-form')[0].reset();
    });
}

//
// Filter reviews
//
function filterBtnClick() {
    $(FILTER_FORM).submit(function (e) {
        e.preventDefault();
        hide(FILTER_ALERT, QUERY_ERROR_MESSAGE, QUERY_TEXT);
        filterReviewHandler();
    });
}

// * * * * * * * * * * * * * 
// Reviews / Posts
// * * * * * * * * * * * * * 
function writeReviewNavClick() {
    $(WRITE_REVIEW_NAV).on('click', function (e) {
        e.preventDefault();
        if (state.loggedIn) {
            slideInReviewForm($(this), REVIEW_FORM_SCREEN);
        } else {
            alert('Must be logged in!');
        }
    });
}

function closeReviewFormClick() {
    $(CLOSE_BTN).on('click', function (e) {
        e.preventDefault();
        slideUpReviewForm();
    });
}

function videoUploadClick() {
    $('.video-file-input').on('click', function (e) {
        e.preventDefault();
        alert('Video uploads coming soon!');
    });
}

function starClick() {
    $('.star').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.star').addBack().removeClass('filled-star');
        $(this).nextAll().addBack().addClass('filled-star');
    });
}

// * * * * * * * * * * * * * 
// preview post
// * * * * * * * * * * * * * 
function previewBtnClick() {
    $(PREVIEW_BTN).on('click', function (e) {
        e.preventDefault();
        var $form = $(this).closest('form');
        previewReviewHandler($form);
    });
}

function previewCloseBtnClick() {
    $(PREIVEW_CLOSE_BTN).on('click', function (e) {
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
        var $post = $(this).closest('.post');
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
    $(DELETE_POST_MODAL_BTN).on('click', function (e) {
        e.preventDefault();
        show(DELETE_POST_MODAL);
        $(EDIT_REVIEW_FORM_SCREEN + ' .review-form-modal').addClass('faded');
    });
}

function deletePostBtnClick() {
    $(DELETE_POST_BTN).on('click', function (e) {
        e.preventDefault();
        var id = $(this).closest(EDIT_REVIEW_FORM).attr('data-post-id');
        deletePost(id);
    });
}

function goBackBtnClick() {
    $(GO_BACK_BTN).on('click', function (e) {
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
        if (state.loggedIn) voteOnPost($(this));else alert('Must be logged in');
    });
}

function downVoteClick() {
    $(REVIEWS).on('click', DOWNVOTE_ARROW, function (e) {
        e.preventDefault();
        if (state.loggedIn) voteOnPost($(this), false);else alert('Must be logged in');
    });
}

// * * * * * * * * * * * * * 
// Comment Likes
// * * * * * * * * * * * * * 
function commentLikeClick() {
    $(REVIEWS).on('click', LIKE, function (e) {
        e.preventDefault();
        if (state.loggedIn) likeDislikeComment($(this));else alert('Must be logged in');
    });
}

function commentDislikeClick() {
    $(REVIEWS).on('click', DISLIKE, function (e) {
        e.preventDefault();
        if (state.loggedIn) likeDislikeComment($(this), false);else alert('Must be logged in');
    });
}

// * * * * * * * * * * * * * 
// Comment form SUBMIT
// * * * * * * * * * * * * * 
function commentFormSubmit() {
    $(REVIEWS).on('submit', COMMENT_FORM, function (e) {
        e.preventDefault();
        if (state.loggedIn) commentFormHandler($(this));else console.log('Must be logged in');
    });
}

function replyCommentFormSubmit() {
    $(REVIEWS).on('submit', REPLY_COMMENT_FORM, function (e) {
        e.preventDefault();
        if (state.loggedIn) commentFormHandler($(this));else console.log('Must be logged in');
    });
}

function replyCommentsArrowClick() {
    $(REVIEWS).on('click', '.expand-reply-comments-btn', function (e) {
        e.preventDefault();
        $(this).closest('.comment').find('.reply-comments-container').toggleClass('expand');
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
// Detail page clicks
// * * * * * * * * * * * * 

// open video modal
function expandArrowClick() {
    $(EXPAND_ARROW).on('click', function (e) {
        e.preventDefault();
        var time = Math.floor(state.player.getCurrentTime()),
            url = $(MAIN_VID).attr('src');
        state.expanded = true;
        openVideoModal(url, time, -1);
    });
}

// close video modal
function closeVideoModalClick() {
    $(V_CLOSE_ICON).on('click', function (e) {
        e.preventDefault();
        state.expanded = false;
        closeVideoModal();
    });
}

// next video click
function nextVidBtnClick() {
    $('.next-vid-btn').on('click', function (e) {
        e.preventDefault();
        if (state.expanded) {
            mainModalNavController('next');
        } else {
            modalVideoNavController('next');
        }
    });
}

// prev video click
function prevVidBtnClick() {
    $('.prev-vid-btn').on('click', function (e) {
        e.preventDefault();
        if (state.expanded) {
            mainModalNavController('prev');
        } else {
            modalVideoNavController('prev');
        }
    });
}

// main gallery video clicks
function videoGalleryClicks() {
    $(G_IMG).on('click', function (e) {
        e.preventDefault();
        videoGalleryHandler($(this));
    });
}

// sub gallery video clicks --> opens modal
function moreVideoGalleryClicks() {
    $('.more-content').on('click', G_IMG, function (e) {
        e.preventDefault();
        var url = $(this).attr('data-vid-url'),
            index = $('.more-content .g-video img').index(this);
        openVideoModal(url, 0, index);
    });
}

// opens sub video gallery
function openMoreVideosBtnClick() {
    $('.more-btn').on('click', function (e) {
        e.preventDefault();
        var $btn = $(this);
        $('.more-content-container').toggleClass('slide');
        $btn.toggleClass('open');
        if ($btn.hasClass('open')) {
            $btn.text('Close');
        } else {
            setTimeout(function () {
                $btn.text('Checkout More');
            }, 150);
        }
    });
}

// call to api to fetch more videos
function getMoreVideosIconClick() {
    $(MORE_ICON).on('click', function (e) {
        e.preventDefault();
        nextSearchPageHandler();
    });
}

// * * * * * * * * * * * * 
// Footer clicks
// * * * * * * * * * * * * 
function toTopClick() {
    $(TOP_TOP_ARROW).on('click', function (e) {
        e.preventDefault();
        smoothScroll('#main-header', 300);
    });
}

function newsClick() {
    $('.coming-soon').on('click', function (e) {
        e.preventDefault();
        alert('RSS news feed coming soon');
    });
}

//================================================================================
// Event Listener Groups
//================================================================================
function navMenuEvents() {
    burgerMenuClick();
    burgerIconTouchend();
    mobileMenuItemClick();
    reviewsNavItemClick();
    homeClick();
    loginBtnsClick();
    signupBtnsClick();
    logOutBtnClick();
    droneBannerClicks();
    // footer
    toTopClick();
    newsClick();
    welcomeClick();
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
    starClick();
    reviewFormSubmit();
    editReviewFormSubmit();
    deletePostModalBtnClick();
    deletePostBtnClick();
    goBackBtnClick();
    videoUploadClick();
}

function asideEvents() {
    asideFilterBtnHover();
    clearAsideFiltersClick();
    filterBtnClick();
    searchFilterFormSubmit();
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

function detailPageClicks() {
    expandArrowClick();
    nextVidBtnClick();
    prevVidBtnClick();
    closeVideoModalClick();
    openMoreVideosBtnClick();
    getMoreVideosIconClick();
    videoGalleryClicks();
    moreVideoGalleryClicks();
}

function init() {
    getPostsFromDb(); // populates posts from database
    displayDroneSlider(); // inits drone slider and conceals FOUC
    displayDroneModelsSlider();
    droneModelSlideChange();
    displayCurrentUser();
    checkIfUserLoggedIn();
    limitNavUserMessage();
    if (location.href.indexOf('drones') >= 0) {
        // only fires when user is on page slider element exists
        displayDetailSpecs(0); // fetches specs for each review post drone model        
    }
}

function utils() {
    fixBannerNav();
    fillDroneOptGroups();
    responsiveReslick();
    checkSizeHandler();
    hashUrlHandler();
    checkEndpoint();
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
    detailPageClicks();

    init();
});