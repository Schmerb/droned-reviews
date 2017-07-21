'use strict';

let state = {

};

const BURGER_ANCHOR = '.burger-anchor';
const BURGER_WRAP = '.burger-icon-wrap';
const BURGER_ICON = '#burger-icon';
const MOBILE_MENU = '.mobile-menu';
const MOBILE_MENU_ITEM = '.mobile-menu a';

const REVIEWS_CONTAINER = '#reviews-container';

let MOCK_REVIEW_DATA = [
    {
        author: "Mike Schmerbeck",
        make: "DJI",
        model: drones.dji.phantom_4.model,
        specs: drones.dji.phantom_4,
        content: "The Phantom 4 has the perfect mix of professional grade equipment and easy to use in-flight controls. The camera itself is worthy of its own review. The P4 comes with a 4K camera mounted on a gimbal for extremely stable shots. Shoots 1080p video @120f/s which makes for the smoothest slow-motion playback. The intelligent flight modes allow for custom movement using gps for precision accuracy and with return-to-home mode, you never have to worry about not making it back to the take-off area since a series of warnings and auto-flight controls are triggered if battery power drops below a certain threshold. This is the ultimate quad-copter currently on the market and for the price, you get what you pay for!"
    },
    {
        author: "Max McClaskie",
        make: "DJI",
        model: drones.dji.phantom_4_pro.model,
        specs: drones.dji.phantom_4_pro,
        content: "Vestibulum pulvinar quam odio, convallis ultrices dui volutpat id. Fusce eget sapien eget est maximus faucibus eget quis orci. Aliquam ultrices, diam sit amet sollicitudin vulputate, tortor velit posuere massa, id commodo tellus nunc sit amet metus. Nunc nisl erat, semper pellentesque augue nec, fermentum ultrices eros. Donec ac sem enim. Aenean porta eros eu felis molestie semper. Mauris consectetur ante a pharetra varius. Ut tincidunt enim eleifend ligula tempus, nec eleifend dui imperdiet. Proin ac auctor sapien. Vivamus aliquet efficitur consequat. Ut gravida arcu ac malesuada laoreet. Quisque ut dapibus leo. Sed molestie, risus vitae sollicitudin ultricies, velit ligula sodales mauris, vitae bibendum diam orci et libero. Sed suscipit eros eu sapien sodales, eget placerat lorem pulvinar. Etiam et sagittis nisl, eget mollis mi. Phasellus tristique odio et massa facilisis, dictum efficitur eros pellentesque."
    },
    {
        author: "John Digweed",
        make: "DJI",
        model: drones.dji.phantom_3_standard.model,
        specs: drones.dji.phantom_3_standard,
        content: "Morbi consequat erat a mi sollicitudin posuere. Praesent quis hendrerit risus, id euismod justo. Nunc vel malesuada nisi. Suspendisse suscipit urna in luctus facilisis. Integer condimentum dui nunc, ac semper ex varius nec. Vestibulum scelerisque metus eu sem sollicitudin cursus. Curabitur non sapien nisl. Mauris a ultrices est, in accumsan elit. Sed pellentesque nisi consequat urna maximus finibus. Pellentesque interdum urna eu mollis rutrum. Cras vitae urna consequat, dapibus metus ac, sagittis elit. Cras tempus, lectus a dictum venenatis, massa libero eleifend felis, nec malesuada purus tellus et felis."
    },
    {
        author: "Claude VonStroke",
        make: "DJI",
        model: drones.dji.mavic_pro.model,
        specs: drones.dji.mavic_pro,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a tortor sed erat maximus condimentum nec sed risus. Maecenas ut justo sapien. Nulla in condimentum dolor. Fusce pretium nibh magna, vel scelerisque erat rutrum vel. Quisque porttitor ultricies ex. In ac nisl vestibulum, luctus justo hendrerit, ultricies libero. Proin ut cursus enim, nec tempor libero. Nunc venenatis consequat erat id luctus. Vestibulum a urna semper libero molestie malesuada."
    },
    {
        author: "Bommer",
        make: "DJI",
        model: drones.dji.inspire_2_X4S.model,
        specs: drones.dji.inspire_2_X4S,
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
                    <p class="content" id="">${content}</p>
                    <label for="">By: <span class="author">${author}</span></label>
                    <div class="interactions">
                        <button class="upvote-btn" type="button">Up Vote</button>
                        <span>Votes: <span class="votes js-votes">0</span></span>
                        <button class="comment-btn" type="button">Comment</button>
                    </div>
                </div>
            </div>`;
}



//================================================================================
// API calls
//================================================================================



//================================================================================
// Event Listeners
//================================================================================
function burgerMenuClick() {
    $(BURGER_ANCHOR).on('click', () => {
        $(MOBILE_MENU).toggleClass('open');
        $(BURGER_WRAP).toggleClass('open');
        $(BURGER_ICON).toggleClass('open');
    });
}

function mobileMenuItemClick() {
    $(MOBILE_MENU_ITEM).on('click', () => {
        $(MOBILE_MENU).removeClass('open');
        $(BURGER_WRAP).removeClass('open');
        $(BURGER_ICON).removeClass('open');
    });
}

//================================================================================
// Event Listener Groups
//================================================================================
function navMenuClicks() {
    burgerMenuClick();
    mobileMenuItemClick();
}

//================================================================================
// Entry point -- Main
//================================================================================
$(function() {
    navMenuClicks();
    getAndDisplayReviews();
});