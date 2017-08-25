'use strict';

let state = {
    loggedIn: false,
    user: '',
    isMobile: false,
    player: null,
    expanded: false,
    video: {
        query: '',
        nextPageToken: ''
    }
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
const DRONE_SLIDER        = '.drone-slider';
const DRONE_MODELS_SLIDER = '.drone-models-slider';
// Drone detail page
const DETAIL_MAKE    = '.detail-make';
const DETAIL_MODEL   = '.detail-model';
const DETAIL_LISTS   = '.detail-lists';
const AMAZON_LINK    = '.amazon-link';
const MAIN_VID       = '.main-video iframe';
const G_VID_1        = '.g-top-left img';
const G_VID_2        = '.g-top-right img';
const G_VID_3        = '.g-bottom-left img';
const G_VID_4        = '.g-bottom-right img';
const G_IMG          = '.g-video img';
const EXPAND_ARROW   = '.main-video-wrap .fa.fa-expand';
const V_CLOSE_ICON   = '.v-modal-close.fa.fa-times';
const VIDEO_BACKDROP = '.video-backdrop';
const MODAL_IFRAME   = '.frame-wrap iframe';
const MORE_ICON      = '.more-icon.fa';
const SHOWCASE       = '.showcase-wrap';
const GALLERY        = '.video-gallery';
// Aside Filter
const ASIDE_BTN            = '.aside-slide-btn';
const ASIDE_CONTAINER      = '.aside-container';
const SEARCH_FILTER_FORM   = '#search-filter-form';
const SEARCH_FILTER        = '.search-filter';
const QUERY_TEXT           = '.query-text';
const USER_QUERY           = '.js-user-query';
const QUERY_ERROR_MESSAGE  = '.query-error-message';
const FILTER_FORM          = '#radio-filter-form';
const USER_FILTER          = '.js-user-filter';
const FILTER_STATUS        = '.filter-status';
const FILTER_ALERT         = '.filter-alert';
const FILTER_BTN           = '.filter-btn';
const CLEAR_BTN            = '.clear-btn';
// Review 
const REVIEWS           = '#reviews';
const REVIEWS_CONTAINER = '#reviews-container';
const REVIEWS_CONTENT   = '#reviews-content';
const REVIEW            = '.review';
const DETAILS           = '.details';
const SPECS_BTN         = '.specs-btn';
const EXPAND            = '.expand';
// review/comment Interactions
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
// Footer
const TOP_TOP_ARROW = '.to-top';



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns populated review post template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function formReviewPost(postData, byThisUser = false, userVoted) {
    let $this = postData;

    let id      = $this.id,
        author  = $this.author.username || state.user, // If username isnt attached to post, this is new post & attach current session user
        make    = $this.specs.brand,
        model   = $this.specs.model,
        url     = $this.specs.url,
        modelId = $this.drone.model,
        makeId  = $this.drone.make,
        title   = $this.title,
        content = $this.content,
        specs   = $this.specs,
        img_src = specs.img,
        votes   = $this.votes || 0,
        rating  = $this.rating,
        created = getElapsedTime(new Date($this.created));
    
    // Amazon product link
    let amazonLink = $this.specs.link;
    
    content = content.map((paragraph) => {
        return `<p class="paragraph">${paragraph}</p>`;
    });

    let stars = '';
    for (let i = 0; i < rating; i++ ) {
        stars += '<span class="star filled-star">&#9734;</span>'
    }

    let posNeg  = '';
    if (votes < 0)
        posNeg = '&#45;';
    else if (votes > 0)
        posNeg = '+';

    let review = `<div class="review">
                        <div class="post" data-post-id="${id}" data-drone-model="${modelId}">
                            <div class="img-container">
                                <img class="post-img" src="${img_src}">
                                <h3>Model: <span class="model">${model}</span></h3>
                                <h5>Manufacturer: <b><span class="maker"><a href="/drones/${url}">${make}</a></span></b></h5>
                                <div class="post-rating" data-rating="${rating}">
                                    <label>User rating: </label>
                                    <div class="post-stars">${stars}</div>
                                </div>
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
                            <hr class="mobile-only post-hr">
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
                            <div class="detail-header">
                                <h3>Model: <span class="model">${model}</span></h3>
                                <h5>Manufacturer: <span class="maker"><b><a href="/drones/${url}">${make}</a></b></span></h5>
                                <div class="amazon-link-wrap">
                                    <h4>Grab one: <span class="amazon-link">${amazonLink}</span></h4>
                                </div>
                            </div>
                            <div class="specs">
                                <dl class="main-specs">
                                    <dt>Specs</dt>
                                    <dd>Avg. Price: <span>$${specs.price}</span></dd>
                                    <dd>Camera: <span>${specs.camera}</span></dd>
                                    <dd>Max Flight Time: <span class="max-flight">${specs.max_flight_time}</span></dd>
                                    <dd>Max Range: <span>${specs.max_range}</span></dd>
                                    <dd>Max Speed: <span>${specs.max_speed}</span></dd>
                                    <dd>GPS?: <span>${specs.gps}</span></dd>
                                    <dd>3-axis gimbal: <span>${specs.gimbal}</span></dd>
                                    <dd>Flips: <span>${specs.flips || 'NO'}</span></dd>
                                </dl>

                                <dl class="mode-specs">
                                    <dt>Modes</dt>
                                    <dd>Intelligent Flight: <span>${specs.intelligent_flight}</span></dd>
                                    <dd>Avoidance: <span>${specs.avoidance || 'NO'}</span></dd>
                                    <dd>Return Home: <span>${specs.return_home || 'NO'}</span></dd>
                                    <dd>Follow-Me Mode: <span>${specs.follow_me_mode || 'NO'}</span></dd>
                                    <dd>Tracking Mode: <span>${specs.tracking_mode || 'NO'}</span></dd>
                                </dl>
                            </div>
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
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getDetailPageSpecsTemplate(data) {
    return `<li>
                <dl class="main-specs">
                    <dt>Specs</dt>
                    <dd>Avg. Price: <span>$${data.price}</span></dd>
                    <dd>Camera: <span>${data.camera}</span></dd>
                    <dd>Max Flight Time: <span class="">${data.max_flight_time}</span></dd>
                    <dd>Max Range: <span>${data.max_range}</span></dd>
                    <dd>Max Speed: <span>${data.max_speed}</span></dd>
                    <dd>GPS?: <span>${data.gps}</span></dd>
                    <dd>3-axis gimbal: <span>${data.gimbal}</span></dd>
                    <dd>Flips: <span>${data.flips || 'NO'}</span></dd>
                </dl>
            </li>
            <li>
                <dl class="mode-specs">
                    <dt>Modes</dt>
                    <dd>Intelligent Flight: <span>${data.intelligent_flight}</span></dd>
                    <dd>Avoidance: <span>${data.avoidance || 'NO'}</span></dd>
                    <dd>Return Home: <span>${data.return_home || 'NO'}</span></dd>
                    <dd>Follow-Me Mode: <span>${data.follow_me_mode || 'NO'}</span></dd>
                    <dd>Tracking Mode: <span>${data.tracking_mode || 'NO'}</span></dd>
                </dl>
            </li>`;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getGalleryTemplate(video) {
    const EMBED_URL = "https://www.youtube.com/embed";
    let imgUrl      = video.snippet.thumbnails.medium.url,
        videoId     = video.id.videoId,
        description = video.snippet.description;
        
    return `<div class="vid-wrap ${state.isMobile ? 'mobile-vid' : ''}">
                <div class="g-video ${state.isMobile ? 'mobile-vid' : ''}">
                    <img class="${state.isMobile ? 'hidden' : ''}" 
                        src="${imgUrl}" 
                        alt="${description}" 
                        data-vid-url="${EMBED_URL}/${videoId}?enablejsapi=1">
                    <iframe class="mobile-vid ${state.isMobile ? '' : 'hidden'}"
                        src="${EMBED_URL}/${videoId}?enablejsapi=1" 
                        data-alt="${description}" 
                        data-vid-url="${EMBED_URL}/${videoId}?enablejsapi=1"></iframe>
                </div>
            </div>`;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailSpecs(currentSlide) {
    let $currentSlide = $(`.drone-model[data-slick-index="${currentSlide}"]`);
    let model = $currentSlide.attr('data-model'),
        make  = $currentSlide.attr('data-make');
    // grab model data object from drones object

    let data     = getDroneData(make, model),
        specHtml = getDetailPageSpecsTemplate(data);

    $(DETAIL_MODEL).text(data.model);
    $(DETAIL_MAKE).text(data.brand);
    $(DETAIL_LISTS).html(specHtml);
    $(AMAZON_LINK).html(data.link);
    updateDetailVideos($currentSlide);
    let $specs = $('.main-specs span').add('.mode-specs span');
    $specs.each(function(index) {
        if($(this).text() === 'NO') {
            $(this).css({color: 'black'});
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets videos from youtube api and updates current detail 
// page video gallery
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function updateDetailVideos($currentSlide) {
    const EMBED_URL = "https://www.youtube.com/embed";
    let make  = $currentSlide.attr('data-cased-make'),
        model = $currentSlide.find('label').text(); 
    let query = `${make} ${model}`;
    searchYoutubeVideos(query, res => {
        // Save reference to current query and next page of search results
        state.video.query         = query;
        state.video.nextPageToken = res.nextPageToken;

        let vids = res.items;
        let mainVid = vids[0],
            g_vid_1 = vids[1],
            g_vid_2 = vids[2],
            g_vid_3 = vids[3],
            g_vid_4 = vids[4];

        $(MAIN_VID).attr('src', `${EMBED_URL}/${mainVid.id.videoId}?enablejsapi=1&html5=1`)
                   .attr('data-thumbnail', mainVid.snippet.thumbnails.medium.url)
                   .attr('data-alt', mainVid.snippet.description);

        $(G_VID_1).attr('src', `${g_vid_1.snippet.thumbnails.medium.url}`)
                  .attr('data-vid-url', `${EMBED_URL}/${g_vid_1.id.videoId}?enablejsapi=1`)
                  .attr('alt', g_vid_1.snippet.description);

        $(G_VID_2).attr('src', `${g_vid_2.snippet.thumbnails.medium.url}`)
                  .attr('data-vid-url', `${EMBED_URL}/${g_vid_2.id.videoId}?enablejsapi=1`)
                  .attr('alt', g_vid_2.snippet.description);

        $(G_VID_3).attr('src', `${g_vid_3.snippet.thumbnails.medium.url}`)
                  .attr('data-vid-url', `${EMBED_URL}/${g_vid_3.id.videoId}?enablejsapi=1`)
                  .attr('alt', g_vid_3.snippet.description);

        $(G_VID_4).attr('src', `${g_vid_4.snippet.thumbnails.medium.url}`)
                  .attr('data-vid-url', `${EMBED_URL}/${g_vid_4.id.videoId}?enablejsapi=1`)
                  .attr('alt', g_vid_4.snippet.description);
    
        nextSearchPageHandler(); // Load videos in 'checkout more' section
    }, 5);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function videoGalleryHandler($img) {
    let vidUrl   = $img.attr('data-vid-url'),
        thumbUrl = $img.attr('src'),
        alt      = $img.attr('alt');
    let mainVidUrl      = $(MAIN_VID).attr('src'),
        mainVidThumbUrl = $(MAIN_VID).attr('data-thumbnail'),
        mainVidAlt         = $(MAIN_VID).attr('data-alt');
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
    let frames = videos.map(video => {
        return getGalleryTemplate(video);
    });
    $('.more-content').append(frames.join(''));
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Opens video modal and plays video from current time
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function openVideoModal(url, time = 0, index = '') {
    show(VIDEO_BACKDROP);
    $('body').addClass('no-scroll');
    $(MODAL_IFRAME).attr('src', `${url}&start=${time}&autoplay=1`);
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
    let imgs = [
        $('.g-top-left img'),
        $('.g-top-right img'),
        $('.g-bottom-left img'),
        $('.g-bottom-right img')
    ];
    let currentIndex = parseInt($(MODAL_IFRAME).attr('data-index')),
        nextUrl,
        nextIndex;
    if (nextVideo === 'next') {
        if(currentIndex === 3) { // end of videos met
            alert('Go back to checkout more videos!');
            return; // do nothing
        }
        if(currentIndex === -1) { // current modal video is from main iframe, get first gallery img url
            nextUrl   = imgs[0].attr('data-vid-url');
            nextIndex = 0;
        } else {
            nextIndex = currentIndex + 1;
            nextUrl   = imgs[nextIndex].attr('data-vid-url');
        }
    } else {
        if(currentIndex === -1) { // beginning of videos met
            alert('Go back to checkout more videos!');
            return; // do nothing
        }
        if(currentIndex === 0) { 
            nextUrl   = $(MAIN_VID).attr('src'); // current modal video is first gallery img url, get main iframe url
            nextIndex = -1;
        }else {
            nextIndex = currentIndex - 1;
            nextUrl   = imgs[nextIndex].attr('data-vid-url');
        }
    }
    $(MODAL_IFRAME).attr('src', `${nextUrl}&autoplay=1`);
    $(MODAL_IFRAME).attr('data-index', nextIndex);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Modal Video navigation controller for SUB gallery
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function modalVideoNavController(nextVideo) {
    let currentIndex = parseInt($(MODAL_IFRAME).attr('data-index'));

    let next = nextVideo === 'next' ? currentIndex + 1 : currentIndex - 1;
    let url = $(`.more-content .vid-wrap:nth-of-type(${next + 1})`)
                    .find('img')
                    .attr('data-vid-url');

    if (next > $('.more-content img').length - 1 || next < 0) {
        next < 0 ? alert('Click next arrow for more') 
                 : alert('Click prev arrow for more'); 
    } else {
        $(MODAL_IFRAME).attr('src', `${url}&autoplay=1`);
        $(MODAL_IFRAME).attr('data-index', next);
    }
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

        // Check if post is by the current session user
        let byThisUser = false;
        if (post.author.username === state.user) {
            byThisUser = true;
        }
        return formReviewPost(post, byThisUser, didUserVote);
    });

    // Need to append when fetching batch at a time
    let postsStr = posts.reverse().join('');
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
// Opens login/signup modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function openLoginSignupModal(screen) {
    show(LOGIN_SIGNUP_PAGE);
    setTimeout(function() {
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
    setTimeout(function() {
        $(LOGIN_SIGNUP_PAGE).removeClass('slide');
    }, 200);

    setTimeout(function() {
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
    let err = message;
    show(SIGNUP_ERROR);
    if (location === 'email') {
        $(EMAIL_INPUT).addClass('error')
                      .val('')
                      .focus();
    } else if (location === 'username') {
        $(`.signup-form ${USERNAME_INPUT}`).addClass('error')
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
// Slides review form in from top of screen, fades in 
// background
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function slideInReviewForm($nav, SCREEN) {
    let delay = $nav.hasClass('mobile-write') ? 500 : 0; // if click comes from mobile menu, delay so menu closes before form opens
    let modalDelay  = state.isMobile ? 100 : 400,
        screenDelay = state.isMobile ?   0 : 100;
    
    setTimeout(function() {
        show(SCREEN);

        setTimeout(function() {
            $(SCREEN).addClass('fade-in');
        }, screenDelay);

        setTimeout(function() {
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

    let screenDelay = state.isMobile ? 400 : 800;
    setTimeout(function() {
        hide(REVIEW_FORM_SCREEN);
        hide(EDIT_REVIEW_FORM_SCREEN);
    }, screenDelay);

    $('body').removeClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays EDIT review post modal
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayEditPostForm($post) {
    let content   = $post.find('.content').html(),
        postTitle = $post.find('.post-title').text(),
        id        = $post.attr('data-post-id'),
        model     = $post.attr('data-drone-model'),
        rating    = $post.find('.post-rating').attr('data-rating');

    // Removes <p> tags and adds '\n\n' chars to end of each paragraph
    // to display text in form the same way it is displayed on screen
    content = content.split('<p class="paragraph">')
                     .join('')
                     .split('</p>')
                     .map(para => para += '\n\n')
                     .join('')
                     .trim();
    
    
    slideInReviewForm($(EDIT_REVIEW_FORM_SCREEN), EDIT_REVIEW_FORM_SCREEN);

    $('#edit-title-input').val(postTitle);
    $('#edit-post-content').val(content);
    $(`.dropdown-options option[value="${model}"]`).prop('selected', true);
    $(EDIT_REVIEW_FORM).attr('data-post-id', id);
    let $stars = $(EDIT_REVIEW_FORM).find('.star');
    $stars.each((index, el) => {
        // order of indicies is reverse
        if(index > 5 - rating - 1) {
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

    let delay = 0;
    if($details.hasClass('expand')) {
        delay = 100;
    }
    $details.removeClass('expand');
    $specs_btn.removeClass('btn-active');
    setTimeout(function() {
        $commentSection.toggleClass('expand');
        $(commentsBtn).toggleClass('btn-active');
    }, delay);

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
    let delay = 0;
    if($commentSection.hasClass('expand')) {
        delay = 100;
        }
    $commentSection.removeClass('expand');
    $commentS_btn.removeClass('btn-active');
    setTimeout(function() {
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



//================================================================================
// API handlers / Display handlers
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handles clicks on drone banner and redirects
// to corresponding drone brand endpoint
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function droneBannerHandler($droneMake) {
    let brand = $droneMake.attr('id');
    let url = `/drones/${brand}`;
    location.href = url;
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
    resetLoginForm();
    if (password !== rePassword) {
        alert('passwords did not match.');
        $('.signup-form ' + PASS_INPUT).addClass('error');
    } else {
        $('.signup-form ' + PASS_INPUT).removeClass('error');
        closeLoginSignupModal();
        let data = { email, username, password };
        setTimeout(function () {
            createNewUser(data); // makes call to api
        }, 1000);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Resets signup form and removes any error messages
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function resetSignupForm() {
    $(`${SIGNUP_FORM} ${USERNAME_INPUT}`).removeClass('error')
    hide(SIGNUP_ERROR);
    $(SIGNUP_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects username and password from user and 
// calls ajax function to attempt to log user in to session
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function loginFormHandler($form) {
    let username = $form.find('.username-input').val(),
        password = $form.find(PASS_INPUT).val();
    let data = { username, password };

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
    $(`${LOGIN_FORM} ${PASS_INPUT}`).removeClass('error');
    $(LOGIN_FORM)[0].reset();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collects data from form and submits data to API
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function reviewFormHandler($form, editForm = false) {
    let $selectedOpt = $($form).find('.dropdown-options')
                               .find(":selected");
    let make    = $selectedOpt.parent()
                              .attr('label')
                              .toLowerCase(),
        model   = $selectedOpt[0].value,
        title   = $('#title-input').val(),
        content = $('#post-content').val(),
        rating  = $form.find('.filled-star').length;

    let $fileInput = $form.find('.img-file-input');
    let file = $fileInput.val() !== undefined ? $fileInput[0].files[0] : null;
    
    content = content.split('\n\n');

    let post = {
        drone: { make, model },
        title,
        content,
        rating
    };

    if(rating === undefined || rating === 0) {
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
    let form = $form.is(REVIEW_FORM) ? REVIEW_FORM : EDIT_REVIEW_FORM;
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
        created: Date.now()
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
    let created = Date.now();
    let comment = {
        url,
        content,
        author: { username },
        created,
    }

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
// Filters reviews 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function filterReviewHandler() {
    // Get checked radio
    let target = $('input[name="filter"]:checked', FILTER_FORM).val();
    // loop through DOM and check if any matches
    // if yes, loop through DOM and remove reviews that dont match
    let isMatch = false;
    $(REVIEWS_CONTENT)
        .find(REVIEW)
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
        $(REVIEWS_CONTENT)
            .find(REVIEW)
            .each(function (index, review) {
                let make = $(this).find('.maker')
                                  .first()
                                  .text()
                                  .toLowerCase();
                let $hr = $(this).prev('hr');
                if (make.indexOf(target) === -1) {
                    $(this).add($hr).hide();
                } else {
                    $(this).add($hr).show();
                }
            });
        $(`${REVIEW}:visible`).first()
                              .prev('hr')
                              .hide(); // removes <hr> from top of filtered reviews
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
    let baseQuery = $(SEARCH_FILTER).val()
                                    .trim();
    // grab each search keyword
    let query = baseQuery.toLowerCase()
                         .split(' ');

    let resultFound = false;
    $(REVIEWS_CONTENT)
        .find(REVIEW)
        .each(function(index, review) {
            let make  = $(this).find('.maker')
                               .first()
                               .text()
                               .toLowerCase();
            let model = $(this).find('.model')
                               .first()
                               .text()
                               .toLowerCase();
            let $hr = $(this).prev('hr');

            let found = query.map((keyword) => {
                if(make.indexOf(keyword) >= 0 || model.indexOf(keyword) >= 0) {
                    return 1;
                } 
            });
            if(found.indexOf(1) === -1) {
                $(review).add($hr).hide();
            } else {
                $(review).add($hr).show();
                resultFound = true;
            }
        });
    $(USER_QUERY).text(baseQuery);
    if(resultFound) {
        show(QUERY_TEXT);
        $(`${REVIEW}:visible`).first()
                              .prev('hr')
                              .hide();
    } else {
        show(QUERY_ERROR_MESSAGE);
    }
    $(SEARCH_FILTER_FORM)[0].reset();
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays posts to screen and makes call for each
// post's comments
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function postsHandler(posts) {

    displayPosts(posts);
    // Make call to api to get comments for each post
    posts.forEach((post) => {
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
    let updateData = {
        id: postId,
        imgId: file.file._id
    };
    updatePost(updateData);
}

function nextSearchPageHandler() {
    let q     = state.video.query,
    token = state.video.nextPageToken;
    searchYoutubeNextPage(q, token, res => {
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
        success: (res) => {
            // Successfully signed user up, now log them in
            resetSignupForm();
            openLoginSignupModal('login');
            displayWelcomeMessage(res.username);
        },
        error: (err) => {
            let message = err.responseJSON.message;
            let location = err.responseJSON.location;
            console.log(`${location}: ${message}`);
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
        beforeSend: function (xhr) {
            // Send basic auth, uri-encoded header with request
            xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(loginData.username + ':' + loginData.password))));
        },
        success: (res) => {
            if (res.status) {
                location.reload();
            } else {
                displayLoginError(res.message);
            }
        },
        error: (jqXHR, textStatus, err) => {
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
        success: (res) => {
            location.reload();
        },
        error: (jqXHR, textStatus, err) => {
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
        success: function (res) {
            postsHandler(res.posts);
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
    });
}

function getPostById(id, callback) {
    return $.ajax({
        url: `/posts/${id}`,
        type: 'GET',
        dataType: 'json',
        success: callback,
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
    });
}

function createPost(postData, file) {
    $.ajax({
        url: `/posts`,
        type: 'POST',
        dataType: 'json',
        data: postData,
        success: res => {
            if (file) {
                uploadFile(file, res.id);
            } else {
                location.reload();
            }
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
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
            if (file) {
                if (res.imgId !== "") {
                    deleteFile(res.imgId);
                }
                uploadFile(file, res.id);
            } else {
                if (res.hasOwnProperty('title') && !(updateData.hasOwnProperty('votes')))
                    location.reload();
            }
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
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
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
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
        error: (jqXHR, textStatus, err) => {
            console.log(err);
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
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
    });
}

function deleteFile(id) {
    $.ajax({
        url: `/file/img/${id}`,
        type: "DELETE",
        success: res => {
            // console.log(`successfully deleted img(${id})`);
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
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
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
    });
}

function getCommentById(id, callback) {
    $.ajax({
        url: `/posts/comments/${id}`,
        type: 'GET',
        dataType: 'json',
        success: callback,
        error: (jqXHR, textStatus, err) => {
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
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
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
            console.log({ res });
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// YoutTube API calls
// * * * * * * * * * * * * * * * * * * * * * * * * *
const YOUTUBE_KEY = 'AIzaSyCSyc7hnCXopqsh5Z9HlklFAK3gvteRMAY';
const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';

function searchYoutubeVideos(query = '', callback = printToConsole, maxResults = 10) {
    $.ajax({
        url: `${YOUTUBE_URL}/search/`,
        type: 'GET',
        dataType: 'json',
        data: {
            maxResults,
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: query
        },
        success: callback,
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
    });
}

function searchYoutubeNextPage(query, pageToken, callback = printToConsole, maxResults = 10) {
    $.ajax({
        url: `${YOUTUBE_URL}/search/`,
        type: 'GET',
        dataType: 'json',
        data: {
            maxResults,
            pageToken,
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: query,

        },
        success: callback,
        error: (jqXHR, textStatus, err) => {
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
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 415,
                settings: {
                    speed: 2000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: 'ease-in-out'
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
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
        responsive: [
            {
                breakpoint: 440,
                settings: {
                    dots: false
                }
            }
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
        let width = parseInt($('body').css('width'));
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Called by checkSizeHandler to set state if mobile view
// or not and hide/show thumbnail image or iframe of video
// depending on mobile state. Also, swaps the position of
// the main video player and gallery depending on size
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSize() {
    (parseInt($("body").css('width')) <= 414) ? state.isMobile = true : state.isMobile = false;

    navUserMsgHandler();

    if (window.location.href.indexOf('drones') >= 0) {

        if(parseInt($("body").css('width')) <= 400) {
            hide('.more-content img');
            show('.more-content iframe');
            $('.more-content .vid-wrap').addClass('mobile-vid');
        } else {
            hide('.more-content iframe');
            show('.more-content img');
            $('.more-content .vid-wrap').removeClass('mobile-vid');
        }

        if(parseInt($("body").css('width')) <= 720) {
            if(! $(GALLERY).prev().is(SHOWCASE)) {
                $(SHOWCASE).detach().insertBefore(GALLERY);
            }
        } else {
            if (! $(GALLERY).next().is(SHOWCASE)) {
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
    if((parseInt($("body").css('width')) < 585) ) {
        show('.mobile-msg');
    } else {
        hide('.mobile-msg');
    }

    if((parseInt($("body").css('width')) > 700) ) {
        limitNavUserMessage();
    } else {
        limitNavUserMessage(6);
    }

}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// limits the username in message to provided limit, 10
// char is the default max-length
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function limitNavUserMessage(limit = 10) {
    let username = state.user;
    if(username.length > limit) {
        username = username.slice(0, limit - 1);
        $('.user-nav .user-loggedin').text(username + '..');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fixes banner nav to top of screen on scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fixBannerNav() {
    $(window).scroll((e) => {
        let scroll = $(window).scrollTop();
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
        else if(min === 1) return 'a minute ago';
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
// If endpoint has #reviews, smooth scrool to reviews section
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hashUrlHandler() {
    if(location.hash === '#reviews') {
        smoothScroll(REVIEWS);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Checks current endpoint on page load to display correct
// elements and styling for given page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkEndpoint() {
    let endpoint = window.location.pathname;
    if (endpoint.indexOf('drones') >= 0) {
        $('#main-header').removeClass('banner')
                         .addClass('drone-header');
        hide('.landing-greeting');
        $(`.drone-list a[href="${endpoint}"]`).addClass('current-page');
        $(`.drone-list a[href="${endpoint}"]`).parent().addClass('current-page');
    } else if (endpoint.indexOf('mission') >= 0) {
        show('.mission-container');
        hide('.greeting');
        
    }
}

function checkIfUserLoggedIn() {
    if(!state.loggedIn) {
        hide('.logged-in');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// If a user is logged in, display their username in nav
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayCurrentUser() {
    if(state.user !== '') {
        $('.user-loggedin').text(state.user);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets reference to iframe 'showcase' video player
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function onYouTubeIframeAPIReady() {
    state.player = new YT.Player('main-iframe', {
        events: {
            'onReady': () => {
                console.log("Main Player Ready!!");
            },
            'onStateChange': () => {
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
    $(BURGER_ANCHOR).on('click', e => {
        e.preventDefault();
        toggleMobileMenu();
    });
}

function burgerIconTouchend() {
    $(BURGER_ANCHOR).on('touchstart', e => {
        $(BURGER_ICON).addClass('touchstart');
        $(BURGER_ICON).removeClass('touchend');
    });
    $(BURGER_ANCHOR).on('touchend', e => {
        $(BURGER_ICON).removeClass('touchstart');
        $(BURGER_ICON).addClass('touchend');
    });
}

function mobileMenuItemClick() {
    $(MOBILE_MENU_ITEM).on('click', function(e) {
        e.preventDefault();
        if($(this).hasClass('coming-soon')) {
            return
        } else if ($(this).hasClass('write-review') && state.loggedIn === false) {
            return
        } else {
            closeMobileMenu();
        }
    });
}

function reviewsNavItemClick() {
    $(REVIEWS_NAV_ITEM).on('click', e => {
        e.preventDefault();
        if (location.pathname !== '/') {
            window.location = '/#reviews';
        }
        smoothScroll('#reviews');
    });
}

function homeClick() {
    $('.home').on('click', e => {
        e.preventDefault();
        window.location = '/';
    });
}

function welcomeClick() {
    $('.welcome').on('click', e => {
        e.preventDefault();
        location.href = '/welcome';
    });
}

// * * * * * * * * * * * * * 
//   Drone banner clicks
// * * * * * * * * * * * * * 
function droneBannerClicks() {
    $('.drone-make').on('click', function(e) {
        e.preventDefault();
        droneBannerHandler($(this));
    });
}

function droneModelSlideChange() {
    $(DRONE_MODELS_SLIDER).on('afterChange', function(e, slick, currentSlide) {
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
    $(LOGIN_BTN).on('click', e => {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('login');
    });
    // comments login-btn
    $(REVIEWS).on('click', SUB_LOGIN_BTN, e => {
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
    $(LOGOUT_BTN).on('click', (e) => {
        e.preventDefault();
        let delay = parseInt($('body').css('width')) < 585 ? 650 : 0;
        setTimeout(function() {
            logUserOut();
        }, delay);
    });
}


// * * * * * * * * * * * * * 
// Signup modal btn
// * * * * * * * * * * * * * 
function signupBtnsClick() {
    // main nav signup-btn
    $(SIGNUP_BTN).on('click', e => {
        e.preventDefault();
        closeMobileMenu();
        openLoginSignupModal('signup');
    });
    // comments signup-btn
    $(REVIEWS).on('click', SUB_SIGNUP_BTN, e => {
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
    $(window).on('click', e => {
        if (e.target === $(LOGIN_SIGNUP_PAGE)[0] || e.target === $(LOGIN_SIGNUP_X)[0]) {
            closeLoginSignupModal();
        }
    });
}


// * * * * * * * * * * * * * 
// Aside Filter
// * * * * * * * * * * * * * 
function asideFilterBtnHover() {
    $(ASIDE_BTN).mouseenter(e => {
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
// Search Filter Form SUBMIT
//
function searchFilterFormSubmit() {
    $(SEARCH_FILTER_FORM).submit(function(e) {
        e.preventDefault();
        hide(FILTER_ALERT, 
             FILTER_STATUS);
        searchFilterHandler();
    });
}

//
// Clear filters -- show all reviews
//
function clearAsideFiltersClick() {
    $('.clear-btn').on('click', e => {
        e.preventDefault();
        console.log('click');
        hide(FILTER_ALERT, 
             FILTER_STATUS, 
             QUERY_ERROR_MESSAGE, 
             QUERY_TEXT);
        $(REVIEW).add($('.post-hr')).show();

        $('#radio-filter-form')[0].reset();
    });
}

//
// Filter reviews
//
function filterBtnClick() {
    $(FILTER_FORM).submit(e => {
        e.preventDefault();
        hide(FILTER_ALERT, 
             QUERY_ERROR_MESSAGE, 
             QUERY_TEXT);
        filterReviewHandler();
    });
}



// * * * * * * * * * * * * * 
// Reviews / Posts
// * * * * * * * * * * * * * 
function writeReviewNavClick() {
    $(WRITE_REVIEW_NAV).on('click', function(e) {
        e.preventDefault();
        if(state.loggedIn) {
            slideInReviewForm($(this), REVIEW_FORM_SCREEN);
        } else {
            alert('Must be logged in!');
        }
    });
}


function closeReviewFormClick() {
    $(CLOSE_BTN).on('click', e => {
        e.preventDefault();
        slideUpReviewForm();
    });
}

function videoUploadClick() {
    $('.video-file-input').on('click', e => {
        e.preventDefault();
        alert('Video uploads coming soon!');
    });
}


function starClick() {
    $('.star').on('click', function(e) {
        e.preventDefault();
        $('.star').removeClass('filled-star');
        $(this).add($(this)
               .nextAll())
               .addClass('filled-star');
    });
}


// * * * * * * * * * * * * * 
// preview post
// * * * * * * * * * * * * * 
function previewBtnClick() {
    $(PREVIEW_BTN).on('click', function (e) {
        e.preventDefault();
        let $form = $(this).closest('form');
        previewReviewHandler($form);
    });
}

function previewCloseBtnClick() {
    $(PREIVEW_CLOSE_BTN).on('click', e => {
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
    $(DELETE_POST_MODAL_BTN).on('click', e => {
        e.preventDefault();
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
    $(GO_BACK_BTN).on('click', e => {
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
// Detail page clicks
// * * * * * * * * * * * * 

// open video modal
function expandArrowClick() {
    $(EXPAND_ARROW).on('click', e => {
        e.preventDefault();
        let time = Math.floor(state.player.getCurrentTime()),
            url  = $(MAIN_VID).attr('src');
        state.expanded = true;
        openVideoModal(url, time, -1);
    });
}

// close video modal
function closeVideoModalClick() {
    $(V_CLOSE_ICON).on('click', e => {
        e.preventDefault();
        state.expanded = false;
        closeVideoModal();
    });
}

// next video click
function nextVidBtnClick() {
    $('.next-vid-btn').on('click', e => {
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
    $('.prev-vid-btn').on('click', e => {
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
    $(G_IMG).on('click', function(e) {
        e.preventDefault();
        videoGalleryHandler($(this));
    });
}

// sub gallery video clicks --> opens modal
function moreVideoGalleryClicks() {
    $('.more-content').on('click', G_IMG, function(e) {
        e.preventDefault();
        let url   = $(this).attr('data-vid-url'),
            index = $('.more-content .g-video img').index(this);
        openVideoModal(url, 0, index);
    });
}

// opens sub video gallery
function openMoreVideosBtnClick() {
    $('.more-btn').on('click', function(e) {
        e.preventDefault();
        let $btn = $(this);
        $('.more-content-container').toggleClass('slide');
        $btn.toggleClass('open');
        if($btn.hasClass('open')) {
            $btn.text('Close');
        } else {
            setTimeout(function() {
                $btn.text('Checkout More');
            }, 150);
        }
    });
}

// call to api to fetch more videos
function getMoreVideosIconClick() {
    $(MORE_ICON).on('click', e => {
        e.preventDefault();
        nextSearchPageHandler();
    });
}


// * * * * * * * * * * * * 
// Footer clicks
// * * * * * * * * * * * * 
function toTopClick() {
    $(TOP_TOP_ARROW).on('click', e => {
        e.preventDefault();
        smoothScroll('#main-header', 300);
    });
}

function newsClick() {
    $('.coming-soon').on('click', e => {
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
    if(location.href.indexOf('drones') >= 0) { // only fires when user is on page slider element exists
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


