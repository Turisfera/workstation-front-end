import{B as ge,F as ye,s as Ie,R as X,a as we,b as Se,c as xe,d as le,e as se,f as R,x as U,u as ee,g as ke,W as ue,h as Pe,K as Ae,i as De,X as Oe,Y as S,z as F,Q as ce,O as te,r as H,j as m,o as s,k as l,l as b,w as L,m as u,n as g,p as w,q as _,t as Y,v as B,y as x,A as z,T as Le,_ as Be,C as P,D as Ce,E as Te,G as $e,H as Ve,I as Ne,J as Ke,L as Ee,M as D,N as p,P as T,S as je,U as Fe,V as _e,Z as ze,$ as Re}from"./index-DiOrCLNr.js";var He=`
    .p-galleria {
        overflow: hidden;
        border-style: solid;
        border-width: dt('galleria.border.width');
        border-color: dt('galleria.border.color');
        border-radius: dt('galleria.border.radius');
    }

    .p-galleria-content {
        display: flex;
        flex-direction: column;
    }

    .p-galleria-items-container {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .p-galleria-items {
        position: relative;
        display: flex;
        height: 100%;
    }

    .p-galleria-nav-button {
        position: absolute !important;
        top: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background: dt('galleria.nav.button.background');
        color: dt('galleria.nav.button.color');
        width: dt('galleria.nav.button.size');
        height: dt('galleria.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        margin: calc(-1 * calc(dt('galleria.nav.button.size')) / 2) dt('galleria.nav.button.gutter') 0 dt('galleria.nav.button.gutter');
        padding: 0;
        user-select: none;
        border: 0 none;
        cursor: pointer;
        outline-color: transparent;
    }

    .p-galleria-nav-button:not(.p-disabled):hover {
        background: dt('galleria.nav.button.hover.background');
        color: dt('galleria.nav.button.hover.color');
    }

    .p-galleria-nav-button:not(.p-disabled):focus-visible {
        box-shadow: dt('galleria.nav.button.focus.ring.shadow');
        outline: dt('galleria.nav.button.focus.ring.width') dt('galleria.nav.button.focus.ring.style') dt('galleria.nav.button.focus.ring.color');
        outline-offset: dt('galleria.nav.button.focus.ring.offset');
    }

    .p-galleria-next-icon,
    .p-galleria-prev-icon {
        font-size: dt('galleria.nav.icon.size');
        width: dt('galleria.nav.icon.size');
        height: dt('galleria.nav.icon.size');
    }

    .p-galleria-prev-button {
        border-radius: dt('galleria.nav.button.prev.border.radius');
        left: 0;
    }

    .p-galleria-next-button {
        border-radius: dt('galleria.nav.button.next.border.radius');
        right: 0;
    }

    .p-galleria-prev-button:dir(rtl) {
        left: auto;
        right: 0;
        transform: rotate(180deg);
    }

    .p-galleria-next-button:dir(rtl) {
        right: auto;
        left: 0;
        transform: rotate(180deg);
    }

    .p-galleria-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .p-galleria-hover-navigators .p-galleria-nav-button {
        pointer-events: none;
        opacity: 0;
        transition: opacity dt('galleria.transition.duration') ease-in-out;
    }

    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button {
        pointer-events: all;
        opacity: 1;
    }

    .p-galleria-hover-navigators .p-galleria-items-container:hover .p-galleria-nav-button.p-disabled {
        pointer-events: none;
    }

    .p-galleria-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: dt('galleria.caption.background');
        color: dt('galleria.caption.color');
        padding: dt('galleria.caption.padding');
    }

    .p-galleria-thumbnails {
        display: flex;
        flex-direction: column;
        overflow: auto;
        flex-shrink: 0;
    }

    .p-galleria-thumbnail-nav-button {
        align-self: center;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        margin: 0 dt('galleria.thumbnail.nav.button.gutter');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        background: transparent;
        color: dt('galleria.thumbnail.nav.button.color');
        width: dt('galleria.thumbnail.nav.button.size');
        height: dt('galleria.thumbnail.nav.button.size');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.thumbnail.nav.button.border.radius');
    }

    .p-galleria-thumbnail-nav-button:hover {
        background: dt('galleria.thumbnail.nav.button.hover.background');
        color: dt('galleria.thumbnail.nav.button.hover.color');
    }

    .p-galleria-thumbnail-nav-button:focus-visible {
        box-shadow: dt('galleria.thumbnail.nav.button.focus.ring.shadow');
        outline: dt('galleria.thumbnail.nav.button.focus.ring.width') dt('galleria.thumbnail.nav.button.focus.ring.style') dt('galleria.thumbnail.nav.button.focus.ring.color');
        outline-offset: dt('galleria.thumbnail.nav.button.focus.ring.offset');
    }

    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-next-icon,
    .p-galleria-thumbnail-nav-button .p-galleria-thumbnail-prev-icon {
        font-size: dt('galleria.thumbnail.nav.button.icon.size');
        width: dt('galleria.thumbnail.nav.button.icon.size');
        height: dt('galleria.thumbnail.nav.button.icon.size');
    }

    .p-galleria-thumbnails-content {
        display: flex;
        flex-direction: row;
        background: dt('galleria.thumbnails.content.background');
        padding: dt('galleria.thumbnails.content.padding');
    }

    .p-galleria-thumbnails-viewport {
        overflow: hidden;
        width: 100%;
    }

    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-prev-button:dir(rtl),
    .p-galleria:not(.p-galleria-thumbnails-right):not(.p-galleria-thumbnails-left) .p-galleria-thumbnail-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-galleria-thumbnail-items {
        display: flex;
    }

    .p-galleria-thumbnail-item {
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0.5;
    }

    .p-galleria-thumbnail {
        outline-color: transparent;
    }

    .p-galleria-thumbnail-item:hover {
        opacity: 1;
        transition: opacity 0.3s;
    }

    .p-galleria-thumbnail-item-current {
        opacity: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-content,
    .p-galleria-thumbnails-right .p-galleria-content {
        flex-direction: row;
    }

    .p-galleria-thumbnails-left .p-galleria-items-container,
    .p-galleria-thumbnails-right .p-galleria-items-container {
        flex-direction: row;
    }

    .p-galleria-thumbnails-left .p-galleria-items-container,
    .p-galleria-thumbnails-top .p-galleria-items-container {
        order: 2;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnails,
    .p-galleria-thumbnails-top .p-galleria-thumbnails {
        order: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnails-content,
    .p-galleria-thumbnails-right .p-galleria-thumbnails-content {
        flex-direction: column;
        flex-grow: 1;
    }

    .p-galleria-thumbnails-left .p-galleria-thumbnail-items,
    .p-galleria-thumbnails-right .p-galleria-thumbnail-items {
        flex-direction: column;
        height: 100%;
    }

    .p-galleria-indicator-list {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: dt('galleria.indicator.list.padding');
        gap: dt('galleria.indicator.list.gap');
        margin: 0;
        list-style: none;
    }

    .p-galleria-indicator-button {
        display: inline-flex;
        align-items: center;
        background: dt('galleria.indicator.button.background');
        width: dt('galleria.indicator.button.width');
        height: dt('galleria.indicator.button.height');
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration'),
            box-shadow dt('galleria.transition.duration');
        outline-color: transparent;
        border-radius: dt('galleria.indicator.button.border.radius');
        margin: 0;
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
    }

    .p-galleria-indicator-button:hover {
        background: dt('galleria.indicator.button.hover.background');
    }

    .p-galleria-indicator-button:focus-visible {
        box-shadow: dt('galleria.indicator.button.focus.ring.shadow');
        outline: dt('galleria.indicator.button.focus.ring.width') dt('galleria.indicator.button.focus.ring.style') dt('galleria.indicator.button.focus.ring.color');
        outline-offset: dt('galleria.indicator.button.focus.ring.offset');
    }

    .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.indicator.button.active.background');
    }

    .p-galleria-indicators-left .p-galleria-items-container,
    .p-galleria-indicators-right .p-galleria-items-container {
        flex-direction: row;
        align-items: center;
    }

    .p-galleria-indicators-left .p-galleria-items,
    .p-galleria-indicators-top .p-galleria-items {
        order: 2;
    }

    .p-galleria-indicators-left .p-galleria-indicator-list,
    .p-galleria-indicators-top .p-galleria-indicator-list {
        order: 1;
    }

    .p-galleria-indicators-left .p-galleria-indicator-list,
    .p-galleria-indicators-right .p-galleria-indicator-list {
        flex-direction: column;
    }

    .p-galleria-inset-indicators .p-galleria-indicator-list {
        position: absolute;
        display: flex;
        z-index: 1;
        background: dt('galleria.inset.indicator.list.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-button:hover {
        background: dt('galleria.inset.indicator.button.hover.background');
    }

    .p-galleria-inset-indicators .p-galleria-indicator-active .p-galleria-indicator-button {
        background: dt('galleria.inset.indicator.button.active.background');
    }

    .p-galleria-inset-indicators.p-galleria-indicators-top .p-galleria-indicator-list {
        top: 0;
        left: 0;
        width: 100%;
        align-items: flex-start;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-right .p-galleria-indicator-list {
        right: 0;
        top: 0;
        height: 100%;
        align-items: flex-end;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-bottom .p-galleria-indicator-list {
        bottom: 0;
        left: 0;
        width: 100%;
        align-items: flex-end;
    }

    .p-galleria-inset-indicators.p-galleria-indicators-left .p-galleria-indicator-list {
        left: 0;
        top: 0;
        height: 100%;
        align-items: flex-start;
    }

    .p-galleria-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-galleria-close-button {
        position: absolute !important;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: dt('galleria.close.button.gutter');
        background: dt('galleria.close.button.background');
        color: dt('galleria.close.button.color');
        width: dt('galleria.close.button.size');
        height: dt('galleria.close.button.size');
        padding: 0;
        border: none;
        user-select: none;
        cursor: pointer;
        border-radius: dt('galleria.close.button.border.radius');
        outline-color: transparent;
        transition:
            background dt('galleria.transition.duration'),
            color dt('galleria.transition.duration'),
            outline-color dt('galleria.transition.duration');
    }

    .p-galleria-close-icon {
        font-size: dt('galleria.close.button.icon.size');
        width: dt('galleria.close.button.icon.size');
        height: dt('galleria.close.button.icon.size');
    }

    .p-galleria-close-button:hover {
        background: dt('galleria.close.button.hover.background');
        color: dt('galleria.close.button.hover.color');
    }

    .p-galleria-close-button:focus-visible {
        box-shadow: dt('galleria.close.button.focus.ring.shadow');
        outline: dt('galleria.close.button.focus.ring.width') dt('galleria.close.button.focus.ring.style') dt('galleria.close.button.focus.ring.color');
        outline-offset: dt('galleria.close.button.focus.ring.offset');
    }

    .p-galleria-mask .p-galleria-nav-button {
        position: fixed;
        top: 50%;
    }

    .p-galleria-enter-active {
        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
    }

    .p-galleria-leave-active {
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .p-galleria-enter-from,
    .p-galleria-leave-to {
        opacity: 0;
        transform: scale(0.7);
    }

    .p-galleria-enter-active .p-galleria-nav-button {
        opacity: 0;
    }

    .p-items-hidden .p-galleria-thumbnail-item {
        visibility: hidden;
    }

    .p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {
        visibility: visible;
    }
`,Me={mask:"p-galleria-mask p-overlay-mask p-overlay-mask-enter",root:function(t){var n=t.instance,i=n.$attrs.showThumbnails&&n.getPositionClass("p-galleria-thumbnails",n.$attrs.thumbnailsPosition),o=n.$attrs.showIndicators&&n.getPositionClass("p-galleria-indicators",n.$attrs.indicatorsPosition);return["p-galleria p-component",{"p-galleria-fullscreen":n.$attrs.fullScreen,"p-galleria-inset-indicators":n.$attrs.showIndicatorsOnItem,"p-galleria-hover-navigators":n.$attrs.showItemNavigatorsOnHover&&!n.$attrs.fullScreen},i,o]},closeButton:"p-galleria-close-button",closeIcon:"p-galleria-close-icon",header:"p-galleria-header",content:"p-galleria-content",footer:"p-galleria-footer",itemsContainer:"p-galleria-items-container",items:"p-galleria-items",prevButton:function(t){var n=t.instance;return["p-galleria-prev-button p-galleria-nav-button",{"p-disabled":n.isNavBackwardDisabled}]},prevIcon:"p-galleria-prev-icon",item:"p-galleria-item",nextButton:function(t){var n=t.instance;return["p-galleria-next-button p-galleria-nav-button",{"p-disabled":n.isNavForwardDisabled}]},nextIcon:"p-galleria-next-icon",caption:"p-galleria-caption",indicatorList:"p-galleria-indicator-list",indicator:function(t){var n=t.instance,i=t.index;return["p-galleria-indicator",{"p-galleria-indicator-active":n.isIndicatorItemActive(i)}]},indicatorButton:"p-galleria-indicator-button",thumbnails:"p-galleria-thumbnails",thumbnailContent:"p-galleria-thumbnails-content",thumbnailPrevButton:function(t){var n=t.instance;return["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button",{"p-disabled":n.isNavBackwardDisabled}]},thumbnailPrevIcon:"p-galleria-thumbnail-prev-icon",thumbnailsViewport:"p-galleria-thumbnails-viewport",thumbnailItems:"p-galleria-thumbnail-items",thumbnailItem:function(t){var n=t.instance,i=t.index,o=t.activeIndex;return["p-galleria-thumbnail-item",{"p-galleria-thumbnail-item-current":o===i,"p-galleria-thumbnail-item-active":n.isItemActive(i),"p-galleria-thumbnail-item-start":n.firstItemAciveIndex()===i,"p-galleria-thumbnail-item-end":n.lastItemActiveIndex()===i}]},thumbnail:"p-galleria-thumbnail",thumbnailNextButton:function(t){var n=t.instance;return["p-galleria-thumbnail-next-button p-galleria-thumbnail-nav-button",{"p-disabled":n.isNavForwardDisabled}]},thumbnailNextIcon:"p-galleria-thumbnail-next-icon"},Ue=ge.extend({name:"galleria",style:He,classes:Me}),Ge={name:"BaseGalleria",extends:R,props:{id:{type:String,default:null},value:{type:Array,default:null},activeIndex:{type:Number,default:0},fullScreen:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},numVisible:{type:Number,default:3},responsiveOptions:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!1},showThumbnailNavigators:{type:Boolean,default:!0},showItemNavigatorsOnHover:{type:Boolean,default:!1},changeItemOnIndicatorHover:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},autoPlay:{type:Boolean,default:!1},transitionInterval:{type:Number,default:4e3},showThumbnails:{type:Boolean,default:!0},thumbnailsPosition:{type:String,default:"bottom"},verticalThumbnailViewPortHeight:{type:String,default:"300px"},showIndicators:{type:Boolean,default:!1},showIndicatorsOnItem:{type:Boolean,default:!1},indicatorsPosition:{type:String,default:"bottom"},baseZIndex:{type:Number,default:0},maskClass:{type:String,default:null},containerStyle:{type:null,default:null},containerClass:{type:null,default:null},containerProps:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},ariaLabel:{type:String,default:null},ariaRoledescription:{type:String,default:null}},style:Ue,provide:function(){return{$pcGalleria:this,$parentInstance:this}}};function $(e){return Ye(e)||Xe(e)||We(e)||qe()}function qe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function We(e,t){if(e){if(typeof e=="string")return q(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}function Xe(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ye(e){if(Array.isArray(e))return q(e)}function q(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var de={name:"GalleriaItem",hostName:"Galleria",extends:R,emits:["start-slideshow","stop-slideshow","update:activeIndex"],props:{circular:{type:Boolean,default:!1},activeIndex:{type:Number,default:0},value:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},slideShowActive:{type:Boolean,default:!0},changeItemOnIndicatorHover:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!1},templates:{type:null,default:null},id:{type:String,default:null}},mounted:function(){this.autoPlay&&this.$emit("start-slideshow")},methods:{getIndicatorPTOptions:function(t){return{context:{highlighted:this.activeIndex===t}}},next:function(){var t=this.activeIndex+1,n=this.circular&&this.value.length-1===this.activeIndex?0:t;this.$emit("update:activeIndex",n)},prev:function(){var t=this.activeIndex!==0?this.activeIndex-1:0,n=this.circular&&this.activeIndex===0?this.value.length-1:t;this.$emit("update:activeIndex",n)},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},navBackward:function(t){this.stopSlideShow(),this.prev(),t&&t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow(),this.next(),t&&t.cancelable&&t.preventDefault()},onIndicatorClick:function(t){this.stopSlideShow(),this.$emit("update:activeIndex",t)},onIndicatorMouseEnter:function(t){this.changeItemOnIndicatorHover&&(this.stopSlideShow(),this.$emit("update:activeIndex",t))},onIndicatorKeyDown:function(t,n){switch(t.code){case"Enter":case"NumpadEnter":case"Space":this.stopSlideShow(),this.$emit("update:activeIndex",n),t.preventDefault();break;case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"Tab":this.onTabKey();break;case"ArrowDown":case"ArrowUp":case"PageUp":case"PageDown":t.preventDefault();break}},onRightKey:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===t.length?t.length-1:n+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,t.length-1)},onTabKey:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=t.findIndex(function(a){return ce(a,"data-p-active")===!0}),i=F(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]'),o=t.findIndex(function(a){return a===i.parentElement});t[o].children[0].tabIndex="-1",t[n].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=F(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]');return t.findIndex(function(i){return i===n.parentElement})},changedFocusedIndicator:function(t,n){var i=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]'));i[t].children[0].tabIndex="-1",i[n].children[0].tabIndex="0",i[n].children[0].focus()},isIndicatorItemActive:function(t){return this.activeIndex===t},ariaSlideNumber:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,t):void 0},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{activeItem:function(){return this.value[this.activeIndex]},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.activeIndex===0},isNavForwardDisabled:function(){return!this.circular&&this.activeIndex===this.value.length-1}},components:{ChevronLeftIcon:se,ChevronRightIcon:le},directives:{ripple:X}},Ze=["disabled"],Je=["id","aria-label","aria-roledescription"],Qe=["disabled"],et=["aria-label","aria-selected","aria-controls","onClick","onMouseenter","onKeydown","data-p-active"],tt=["tabindex"];function nt(e,t,n,i,o,a){var f=H("ripple");return s(),m("div",u({class:e.cx("itemsContainer")},e.ptm("itemsContainer")),[l("div",u({class:e.cx("items")},e.ptm("items")),[n.showItemNavigators?L((s(),m("button",u({key:0,type:"button",class:e.cx("prevButton"),onClick:t[0]||(t[0]=function(c){return a.navBackward(c)}),disabled:a.isNavBackwardDisabled},e.ptm("prevButton"),{"data-pc-group-section":"itemnavigator"}),[(s(),g(w(n.templates.previousitemicon||"ChevronLeftIcon"),u({class:e.cx("prevIcon")},e.ptm("prevIcon")),null,16,["class"]))],16,Ze)),[[f]]):b("",!0),l("div",u({id:n.id+"_item_"+n.activeIndex,class:e.cx("item"),role:"group","aria-label":a.ariaSlideNumber(n.activeIndex+1),"aria-roledescription":a.ariaSlideLabel},e.ptm("item")),[n.templates.item?(s(),g(w(n.templates.item),{key:0,item:a.activeItem},null,8,["item"])):b("",!0)],16,Je),n.showItemNavigators?L((s(),m("button",u({key:1,type:"button",class:e.cx("nextButton"),onClick:t[1]||(t[1]=function(c){return a.navForward(c)}),disabled:a.isNavForwardDisabled},e.ptm("nextButton"),{"data-pc-group-section":"itemnavigator"}),[(s(),g(w(n.templates.nextitemicon||"ChevronRightIcon"),u({class:e.cx("nextIcon")},e.ptm("nextIcon")),null,16,["class"]))],16,Qe)),[[f]]):b("",!0),n.templates.caption?(s(),m("div",u({key:2,class:e.cx("caption")},e.ptm("caption")),[n.templates.caption?(s(),g(w(n.templates.caption),{key:0,item:a.activeItem},null,8,["item"])):b("",!0)],16)):b("",!0)],16),n.showIndicators?(s(),m("ul",u({key:0,ref:"indicatorContent",class:e.cx("indicatorList")},e.ptm("indicatorList")),[(s(!0),m(_,null,Y(n.value,function(c,r){return s(),m("li",u({key:"p-galleria-indicator-".concat(r),class:e.cx("indicator",{index:r}),"aria-label":a.ariaPageLabel(r+1),"aria-selected":n.activeIndex===r,"aria-controls":n.id+"_item_"+r,onClick:function(k){return a.onIndicatorClick(r)},onMouseenter:function(k){return a.onIndicatorMouseEnter(r)},onKeydown:function(k){return a.onIndicatorKeyDown(k,r)}},{ref_for:!0},e.ptm("indicator",a.getIndicatorPTOptions(r)),{"data-p-active":a.isIndicatorItemActive(r)}),[n.templates.indicator?b("",!0):(s(),m("button",u({key:0,type:"button",tabindex:n.activeIndex===r?"0":"-1",class:e.cx("indicatorButton")},{ref_for:!0},e.ptm("indicatorButton",a.getIndicatorPTOptions(r))),null,16,tt)),n.templates.indicator?(s(),g(w(n.templates.indicator),{key:1,index:r,activeIndex:n.activeIndex,tabindex:n.activeIndex===r?"0":"-1"},null,8,["index","activeIndex","tabindex"])):b("",!0)],16,et)}),128))],16)):b("",!0)],16)}de.render=nt;function G(e){return ot(e)||rt(e)||at(e)||it()}function it(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function at(e,t){if(e){if(typeof e=="string")return W(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?W(e,t):void 0}}function rt(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ot(e){if(Array.isArray(e))return W(e)}function W(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var he={name:"GalleriaThumbnails",hostName:"Galleria",extends:R,emits:["stop-slideshow","update:activeIndex"],props:{containerId:{type:String,default:null},value:{type:Array,default:null},numVisible:{type:Number,default:3},activeIndex:{type:Number,default:0},isVertical:{type:Boolean,default:!1},slideShowActive:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},responsiveOptions:{type:Array,default:null},contentHeight:{type:String,default:"300px"},showThumbnailNavigators:{type:Boolean,default:!0},templates:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null}},startPos:null,thumbnailsStyle:null,sortedResponsiveOptions:null,data:function(){return{d_numVisible:this.numVisible,d_oldNumVisible:this.numVisible,d_activeIndex:this.activeIndex,d_oldActiveItemIndex:this.activeIndex,totalShiftedItems:0,page:0}},watch:{numVisible:function(t,n){this.d_numVisible=t,this.d_oldNumVisible=n},activeIndex:function(t,n){this.d_activeIndex=t,this.d_oldActiveItemIndex=n}},mounted:function(){this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()},updated:function(){var t=this.totalShiftedItems;(this.d_oldNumVisible!==this.d_numVisible||this.d_oldActiveItemIndex!==this.d_activeIndex)&&(this.d_activeIndex<=this.getMedianItemIndex()?t=0:this.value.length-this.d_numVisible+this.getMedianItemIndex()<this.d_activeIndex?t=this.d_numVisible-this.value.length:this.value.length-this.d_numVisible<this.d_activeIndex&&this.d_numVisible%2===0?t=this.d_activeIndex*-1+this.getMedianItemIndex()+1:t=this.d_activeIndex*-1+this.getMedianItemIndex(),t!==this.totalShiftedItems&&(this.totalShiftedItems=t),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(t*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(t*(100/this.d_numVisible),"%, 0, 0)"),this.d_oldActiveItemIndex!==this.d_activeIndex&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&te(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.d_oldActiveItemIndex=this.d_activeIndex,this.d_oldNumVisible=this.d_numVisible)},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.thumbnailsStyle&&this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle)},methods:{step:function(t){var n=this.totalShiftedItems+t;t<0&&-1*n+this.d_numVisible>this.value.length-1?n=this.d_numVisible-this.value.length:t>0&&n>0&&(n=0),this.circular&&(t<0&&this.value.length-1===this.d_activeIndex?n=0:t>0&&this.d_activeIndex===0&&(n=this.d_numVisible-this.value.length)),this.$refs.itemsContainer&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&te(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(n*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(n*(100/this.d_numVisible),"%, 0, 0)"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=n},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},getMedianItemIndex:function(){var t=Math.floor(this.d_numVisible/2);return this.d_numVisible%2?t:t-1},navBackward:function(t){this.stopSlideShow();var n=this.d_activeIndex!==0?this.d_activeIndex-1:0,i=n+this.totalShiftedItems;this.d_numVisible-i-1>this.getMedianItemIndex()&&(-1*this.totalShiftedItems!==0||this.circular)&&this.step(1);var o=this.circular&&this.d_activeIndex===0?this.value.length-1:n;this.$emit("update:activeIndex",o),t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow();var n=this.d_activeIndex===this.value.length-1?this.value.length-1:this.d_activeIndex+1;n+this.totalShiftedItems>this.getMedianItemIndex()&&(-1*this.totalShiftedItems<this.getTotalPageNumber()-1||this.circular)&&this.step(-1);var i=this.circular&&this.value.length-1===this.d_activeIndex?0:n;this.$emit("update:activeIndex",i),t.cancelable&&t.preventDefault()},onItemClick:function(t){this.stopSlideShow();var n=t;if(n!==this.d_activeIndex){var i=n+this.totalShiftedItems,o=0;n<this.d_activeIndex?(o=this.d_numVisible-i-1-this.getMedianItemIndex(),o>0&&-1*this.totalShiftedItems!==0&&this.step(o)):(o=this.getMedianItemIndex()-i,o<0&&-1*this.totalShiftedItems<this.getTotalPageNumber()-1&&this.step(o)),this.$emit("update:activeIndex",n)}},onThumbnailKeydown:function(t,n){switch((t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.onItemClick(n),t.preventDefault()),t.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"ArrowUp":case"ArrowDown":t.preventDefault();break;case"Tab":this.onTabKey();break}},onRightKey:function(){var t=S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===t.length?t.length-1:n+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,t.length-1)},onTabKey:function(){var t=G(S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),n=t.findIndex(function(a){return ce(a,"data-p-active")===!0}),i=F(this.$refs.itemsContainer,'[tabindex="0"]'),o=t.findIndex(function(a){return a===i.parentElement});t[o].children[0].tabIndex="-1",t[n].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=G(S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),n=F(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"] > [tabindex="0"]');return t.findIndex(function(i){return i===n.parentElement})},changedFocusedIndicator:function(t,n){var i=S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]');i[t].children[0].tabIndex="-1",i[n].children[0].tabIndex="0",i[n].children[0].focus()},onTransitionEnd:function(t){this.$refs.itemsContainer&&t.propertyName==="transform"&&(document.body.setAttribute("data-p-items-hidden","true"),!this.isUnstyled&&ue(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="")},onTouchStart:function(t){var n=t.changedTouches[0];this.startPos={x:n.pageX,y:n.pageY}},onTouchMove:function(t){t.cancelable&&t.preventDefault()},onTouchEnd:function(t){var n=t.changedTouches[0];this.isVertical?this.changePageOnTouch(t,n.pageY-this.startPos.y):this.changePageOnTouch(t,n.pageX-this.startPos.x)},changePageOnTouch:function(t,n){var i=10;Math.abs(n)<i||(n<0?this.navForward(t):this.navBackward(t))},getTotalPageNumber:function(){return this.value.length>this.d_numVisible?this.value.length-this.d_numVisible+1:0},createStyle:function(){if(!this.thumbnailsStyle){var t;this.thumbnailsStyle=document.createElement("style"),this.thumbnailsStyle.type="text/css",Ae(this.thumbnailsStyle,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.body.appendChild(this.thumbnailsStyle)}var n=`
                #`.concat(this.containerId,` [data-pc-section="thumbnailitem"] {
                    flex: 1 0 `).concat(100/this.d_numVisible,`%
                }
            `);if(this.responsiveOptions&&!this.isUnstyled){this.sortedResponsiveOptions=G(this.responsiveOptions);var i=De();this.sortedResponsiveOptions.sort(function(f,c){var r=f.breakpoint,h=c.breakpoint;return Oe(r,h,-1,i)});for(var o=0;o<this.sortedResponsiveOptions.length;o++){var a=this.sortedResponsiveOptions[o];n+=`
                        @media screen and (max-width: `.concat(a.breakpoint,`) {
                            #`).concat(this.containerId,` .p-galleria-thumbnail-item {
                                flex: 1 0 `).concat(100/a.numVisible,`%
                            }
                        }
                    `)}}this.thumbnailsStyle.innerHTML=n},calculatePosition:function(){if(this.$refs.itemsContainer&&this.sortedResponsiveOptions){for(var t=window.innerWidth,n={numVisible:this.numVisible},i=0;i<this.sortedResponsiveOptions.length;i++){var o=this.sortedResponsiveOptions[i];parseInt(o.breakpoint,10)>=t&&(n=o)}this.d_numVisible!==n.numVisible&&(this.d_numVisible=n.numVisible)}},bindDocumentListeners:function(){var t=this;this.documentResizeListener||(this.documentResizeListener=function(){t.calculatePosition()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)},firstItemAciveIndex:function(){return this.totalShiftedItems*-1},lastItemActiveIndex:function(){return this.firstItemAciveIndex()+this.d_numVisible-1},isItemActive:function(t){return this.firstItemAciveIndex()<=t&&this.lastItemActiveIndex()>=t},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.d_activeIndex===0||this.value.length<=this.d_numVisible},isNavForwardDisabled:function(){return!this.circular&&this.d_activeIndex===this.value.length-1||this.value.length<=this.d_numVisible}},components:{ChevronLeftIcon:se,ChevronRightIcon:le,ChevronUpIcon:xe,ChevronDownIcon:Se},directives:{ripple:X}};function V(e){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(e)}function ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,i)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ne(Object(n),!0).forEach(function(i){lt(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ne(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function lt(e,t,n){return(t=st(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function st(e){var t=ut(e,"string");return V(t)=="symbol"?t:t+""}function ut(e,t){if(V(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(V(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var ct=["disabled","aria-label"],dt=["data-p-active","aria-selected","aria-controls","onKeydown","data-p-galleria-thumbnail-item-current","data-p-galleria-thumbnail-item-active","data-p-galleria-thumbnail-item-start","data-p-galleria-thumbnail-item-end"],ht=["tabindex","aria-label","aria-current","onClick"],mt=["disabled","aria-label"];function pt(e,t,n,i,o,a){var f=H("ripple");return s(),m("div",u({class:e.cx("thumbnails")},e.ptm("thumbnails")),[l("div",u({class:e.cx("thumbnailContent")},e.ptm("thumbnailContent")),[n.showThumbnailNavigators?L((s(),m("button",u({key:0,class:e.cx("thumbnailPrevButton"),disabled:a.isNavBackwardDisabled,type:"button","aria-label":a.ariaPrevButtonLabel,onClick:t[0]||(t[0]=function(c){return a.navBackward(c)})},j(j({},n.prevButtonProps),e.ptm("thumbnailPrevButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(s(),g(w(n.templates.previousthumbnailicon||(n.isVertical?"ChevronUpIcon":"ChevronLeftIcon")),u({class:e.cx("thumbnailPrevIcon")},e.ptm("thumbnailPrevIcon")),null,16,["class"]))],16,ct)),[[f]]):b("",!0),l("div",u({class:e.cx("thumbnailsViewport"),style:{height:n.isVertical?n.contentHeight:""}},e.ptm("thumbnailsViewport")),[l("div",u({ref:"itemsContainer",class:e.cx("thumbnailItems"),role:"tablist",onTransitionend:t[1]||(t[1]=function(c){return a.onTransitionEnd(c)}),onTouchstart:t[2]||(t[2]=function(c){return a.onTouchStart(c)}),onTouchmove:t[3]||(t[3]=function(c){return a.onTouchMove(c)}),onTouchend:t[4]||(t[4]=function(c){return a.onTouchEnd(c)})},e.ptm("thumbnailItems")),[(s(!0),m(_,null,Y(n.value,function(c,r){return s(),m("div",u({key:"p-galleria-thumbnail-item-".concat(r),class:e.cx("thumbnailItem",{index:r,activeIndex:n.activeIndex}),role:"tab","data-p-active":n.activeIndex===r,"aria-selected":n.activeIndex===r,"aria-controls":n.containerId+"_item_"+r,onKeydown:function(k){return a.onThumbnailKeydown(k,r)}},{ref_for:!0},e.ptm("thumbnailItem"),{"data-p-galleria-thumbnail-item-current":n.activeIndex===r,"data-p-galleria-thumbnail-item-active":a.isItemActive(r),"data-p-galleria-thumbnail-item-start":a.firstItemAciveIndex()===r,"data-p-galleria-thumbnail-item-end":a.lastItemActiveIndex()===r}),[l("div",u({class:e.cx("thumbnail"),tabindex:n.activeIndex===r?"0":"-1","aria-label":a.ariaPageLabel(r+1),"aria-current":n.activeIndex===r?"page":void 0,onClick:function(k){return a.onItemClick(r)}},{ref_for:!0},e.ptm("thumbnail")),[n.templates.thumbnail?(s(),g(w(n.templates.thumbnail),{key:0,item:c},null,8,["item"])):b("",!0)],16,ht)],16,dt)}),128))],16)],16),n.showThumbnailNavigators?L((s(),m("button",u({key:1,class:e.cx("thumbnailNextButton"),disabled:a.isNavForwardDisabled,type:"button","aria-label":a.ariaNextButtonLabel,onClick:t[5]||(t[5]=function(c){return a.navForward(c)})},j(j({},n.nextButtonProps),e.ptm("thumbnailNextButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(s(),g(w(n.templates.nextthumbnailicon||(n.isVertical?"ChevronDownIcon":"ChevronRightIcon")),u({class:e.cx("thumbnailNextIcon")},e.ptm("thumbnailNextIcon")),null,16,["class"]))],16,mt)),[[f]]):b("",!0)],16)],16)}he.render=pt;function N(e){"@babel/helpers - typeof";return N=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},N(e)}function ie(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,i)}return n}function ae(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ie(Object(n),!0).forEach(function(i){vt(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ie(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function vt(e,t,n){return(t=bt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function bt(e){var t=ft(e,"string");return N(t)=="symbol"?t:t+""}function ft(e,t){if(N(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(N(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var me={name:"GalleriaContent",hostName:"Galleria",extends:R,inheritAttrs:!1,interval:null,emits:["activeitem-change","mask-hide"],data:function(){return{activeIndex:this.$attrs.activeIndex,numVisible:this.$attrs.numVisible,slideShowActive:!1}},watch:{"$attrs.value":function(t){t&&t.length<this.numVisible&&(this.numVisible=t.length)},"$attrs.activeIndex":function(t){this.activeIndex=t},"$attrs.numVisible":function(t){this.numVisible=t},"$attrs.autoPlay":function(t){t?this.startSlideShow():this.stopSlideShow()}},updated:function(){this.$emit("activeitem-change",this.activeIndex)},beforeUnmount:function(){this.slideShowActive&&this.stopSlideShow()},methods:{getPTOptions:function(t){return this.ptm(t,{props:ae(ae({},this.$attrs),{},{pt:this.pt,unstyled:this.unstyled})})},isAutoPlayActive:function(){return this.slideShowActive},startSlideShow:function(){var t=this;this.interval=setInterval(function(){var n=t.$attrs.circular&&t.$attrs.value.length-1===t.activeIndex?0:t.activeIndex+1;t.activeIndex=n},this.$attrs.transitionInterval),this.slideShowActive=!0},stopSlideShow:function(){this.interval&&clearInterval(this.interval),this.slideShowActive=!1},getPositionClass:function(t,n){var i=["top","left","bottom","right"],o=i.find(function(a){return a===n});return o?"".concat(t,"-").concat(o):""},isVertical:function(){return this.$attrs.thumbnailsPosition==="left"||this.$attrs.thumbnailsPosition==="right"}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{GalleriaItem:de,GalleriaThumbnails:he,TimesIcon:we},directives:{ripple:X}};function K(e){"@babel/helpers - typeof";return K=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},K(e)}function re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,i)}return n}function oe(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?re(Object(n),!0).forEach(function(i){gt(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):re(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function gt(e,t,n){return(t=yt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function yt(e){var t=It(e,"string");return K(t)=="symbol"?t:t+""}function It(e,t){if(K(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(K(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var wt=["id","aria-label","aria-roledescription"],St=["aria-label"],xt=["aria-live"];function kt(e,t,n,i,o,a){var f=B("GalleriaItem"),c=B("GalleriaThumbnails"),r=H("ripple");return e.$attrs.value&&e.$attrs.value.length>0?(s(),m("div",u({key:0,id:e.$id,role:"region",class:[e.cx("root"),e.$attrs.containerClass],style:e.$attrs.containerStyle,"aria-label":e.$attrs.ariaLabel,"aria-roledescription":e.$attrs.ariaRoledescription},oe(oe({},e.$attrs.containerProps),a.getPTOptions("root"))),[e.$attrs.fullScreen?L((s(),m("button",u({key:0,autofocus:"",type:"button",class:e.cx("closeButton"),"aria-label":a.closeAriaLabel,onClick:t[0]||(t[0]=function(h){return e.$emit("mask-hide")})},a.getPTOptions("closeButton")),[(s(),g(w(e.$attrs.templates.closeicon||"TimesIcon"),u({class:e.cx("closeIcon")},a.getPTOptions("closeIcon")),null,16,["class"]))],16,St)),[[r]]):b("",!0),e.$attrs.templates&&e.$attrs.templates.header?(s(),m("div",u({key:1,class:e.cx("header")},a.getPTOptions("header")),[(s(),g(w(e.$attrs.templates.header)))],16)):b("",!0),l("div",u({class:e.cx("content"),"aria-live":e.$attrs.autoPlay?"polite":"off"},a.getPTOptions("content")),[x(f,{id:e.$id,activeIndex:o.activeIndex,"onUpdate:activeIndex":t[1]||(t[1]=function(h){return o.activeIndex=h}),slideShowActive:o.slideShowActive,"onUpdate:slideShowActive":t[2]||(t[2]=function(h){return o.slideShowActive=h}),value:e.$attrs.value,circular:e.$attrs.circular,templates:e.$attrs.templates,showIndicators:e.$attrs.showIndicators,changeItemOnIndicatorHover:e.$attrs.changeItemOnIndicatorHover,showItemNavigators:e.$attrs.showItemNavigators,autoPlay:e.$attrs.autoPlay,onStartSlideshow:a.startSlideShow,onStopSlideshow:a.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["id","activeIndex","slideShowActive","value","circular","templates","showIndicators","changeItemOnIndicatorHover","showItemNavigators","autoPlay","onStartSlideshow","onStopSlideshow","pt","unstyled"]),e.$attrs.showThumbnails?(s(),g(c,{key:0,activeIndex:o.activeIndex,"onUpdate:activeIndex":t[3]||(t[3]=function(h){return o.activeIndex=h}),slideShowActive:o.slideShowActive,"onUpdate:slideShowActive":t[4]||(t[4]=function(h){return o.slideShowActive=h}),containerId:e.$id,value:e.$attrs.value,templates:e.$attrs.templates,numVisible:o.numVisible,responsiveOptions:e.$attrs.responsiveOptions,circular:e.$attrs.circular,isVertical:a.isVertical(),contentHeight:e.$attrs.verticalThumbnailViewPortHeight,showThumbnailNavigators:e.$attrs.showThumbnailNavigators,prevButtonProps:e.$attrs.prevButtonProps,nextButtonProps:e.$attrs.nextButtonProps,onStopSlideshow:a.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["activeIndex","slideShowActive","containerId","value","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","prevButtonProps","nextButtonProps","onStopSlideshow","pt","unstyled"])):b("",!0)],16,xt),e.$attrs.templates&&e.$attrs.templates.footer?(s(),m("div",u({key:2,class:e.cx("footer")},a.getPTOptions("footer")),[(s(),g(w(e.$attrs.templates.footer)))],16)):b("",!0)],16,wt)):b("",!0)}me.render=kt;var pe={name:"Galleria",extends:Ge,inheritAttrs:!1,emits:["update:activeIndex","update:visible"],container:null,mask:null,documentKeydownListener:null,data:function(){return{containerVisible:this.visible,target:null}},updated:function(){this.fullScreen&&this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.fullScreen&&ee(),this.mask=null,this.container&&(U.clear(this.container),this.container=null)},methods:{onBeforeEnter:function(t){U.set("modal",t,this.baseZIndex||this.$primevue.config.zIndex.modal)},onEnter:function(t){this.target=document.activeElement,this.mask.style.zIndex=String(parseInt(t.style.zIndex,10)-1),Pe(),this.focus(),this.bindGlobalListeners()},onBeforeLeave:function(){!this.isUnstyled&&ue(this.mask,"p-overlay-mask-leave")},onLeave:function(){ke(this.target),this.target=null},onAfterLeave:function(t){U.clear(t),this.containerVisible=!1,ee(),this.unbindGlobalListeners()},onActiveItemChange:function(t){this.activeIndex!==t&&this.$emit("update:activeIndex",t)},maskHide:function(){this.$emit("update:visible",!1)},containerRef:function(t){this.container=t},maskRef:function(t){this.mask=t},onKeyDown:function(t){t.code==="Escape"&&this.maskHide()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindGlobalListeners:function(){this.fullScreen&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.fullScreen&&this.unbindDocumentKeyDownListener()},focus:function(){var t=this.container.$el.querySelector("[autofocus]");t&&t.focus()}},components:{GalleriaContent:me,Portal:Ie},directives:{focustrap:ye}},Pt=["aria-modal"];function At(e,t,n,i,o,a){var f=B("GalleriaContent"),c=B("Portal"),r=H("focustrap");return e.fullScreen?(s(),g(c,{key:0},{default:z(function(){return[o.containerVisible?(s(),m("div",u({key:0,ref:a.maskRef,class:[e.cx("mask"),e.maskClass],role:"dialog","aria-modal":e.fullScreen?"true":void 0},e.ptm("mask")),[x(Le,u({name:"p-galleria",onBeforeEnter:a.onBeforeEnter,onEnter:a.onEnter,onBeforeLeave:a.onBeforeLeave,onLeave:a.onLeave,onAfterLeave:a.onAfterLeave,appear:""},e.ptm("transition")),{default:z(function(){return[e.visible?L((s(),g(f,u({key:0,ref:a.containerRef,onMaskHide:a.maskHide,templates:e.$slots,onActiveitemChange:a.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["onMaskHide","templates","onActiveitemChange","pt","unstyled"])),[[r]]):b("",!0)]}),_:1},16,["onBeforeEnter","onEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,Pt)):b("",!0)]}),_:1})):(s(),g(f,u({key:1,templates:e.$slots,onActiveitemChange:a.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["templates","onActiveitemChange","pt","unstyled"]))}pe.render=At;const Dt={key:0,class:"loading-container"},Ot={key:1,class:"detail-container"},Lt={class:"info-column"},Bt={class:"header"},Ct={class:"title"},Tt={class:"meta-info"},$t={class:"location"},Vt=["src","alt"],Nt={class:"section"},Kt={class:"section"},Et={class:"section"},jt={class:"booking-column"},Ft={class:"booking-card"},_t={class:"price"},zt={class:"booking-form"},Rt={class:"form-group"},Ht={class:"form-group"},Mt={class:"form-group"},Ut={class:"total-price"},Gt={key:2,class:"not-found-container"},qt={__name:"experience-detail-view.page",props:{id:{type:String,required:!0}},setup(e){const t=e,n=new Ne,i=P(null),o=P(!0),a=P(null),f=P(1),c=P(null),{t:r}=Ce(),h=Te(),k=new Re;P([]);const C=P([]),M=P([]),ve=$e(()=>i.value?i.value.price*f.value:0),Z=d=>{switch(d?d.toLowerCase():""){case"weekdays":C.value=[0,6];break;case"weekends":C.value=[1,2,3,4,5];break;case"daily":C.value=[];break;default:console.warn(`Frecuencia de experiencia desconocida o no mapeada: "${d}". Se deshabilitarán todos los días por precaución.`),C.value=[0,1,2,3,4,5,6];break}};Ve(async()=>{try{const d=await n.getExperienceById(Number(t.id));d.data&&(i.value=Ke.toEntityFromResource(d.data),console.log("Frecuencias de la experiencia:",i.value.frequencies),i.value.schedule&&Array.isArray(i.value.schedule)?M.value=i.value.schedule.map(v=>v.time):(M.value=[],console.warn("La propiedad 'schedule' de la experiencia no es un array o es nula.")),i.value.frequencies?Z(i.value.frequencies):(console.warn("La propiedad 'frequencies' de la experiencia es nula o vacía. Deshabilitando todos los días por precaución."),Z("none")))}catch(d){console.error(r("error.loadExperienceError"),d),i.value=null}finally{o.value=!1}}),Ee(a,d=>{c.value=null});const be=async()=>{if(!a.value){h.add({severity:"warn",summary:r("common.warning"),detail:r("error.selectDateAlert"),life:3e3});return}if(!c.value){h.add({severity:"warn",summary:r("common.warning"),detail:r("error.selectScheduleAlert"),life:3e3});return}const d=a.value.getDay(),v=i.value.frequencies.toLowerCase();let A=!1;switch(v){case"weekdays":A=d>=1&&d<=5;break;case"weekends":A=d===0||d===6;break;case"daily":A=!0;break;default:A=!1;break}if(!A){h.add({severity:"error",summary:r("common.error"),detail:r("error.invalidDateFrequencyAlert"),life:5e3});return}if(!localStorage.getItem("token")){h.add({severity:"error",summary:r("common.error"),detail:r("error.userNotLoggedIn"),life:5e3}),console.error("No authentication token found. User must be logged in to make a booking.");return}const y={experienceId:i.value.id,bookingDate:a.value.toISOString(),numberOfPeople:f.value,time:c.value};console.log("Booking data sent:",y);try{const I=await k.createBooking(y);I.status>=200&&I.status<300?h.add({severity:"success",summary:r("common.success"),detail:r("booking.success"),life:3e3}):(console.error("Error en la respuesta no-2xx del backend:",I.status,I.data),h.add({severity:"error",summary:r("common.error"),detail:r("error.networkOrServerIssue"),life:7e3}))}catch(I){if(h.add({severity:"error",summary:r("common.error"),detail:r("error.networkOrServerIssue"),life:7e3}),console.error("Error de red o del servidor al crear reserva:",I),I.response&&I.response.data){console.error("Detalles de error del backend (catch):",I.response.data);const O=I.response.data;let E=r("error.bookingFailedDefault");if(O.message)E=O.message;else if(O.errors){const fe=Object.values(O.errors).flat().map(Q=>Q.message||Q);E=r("error.validationFailed")+": "+fe.join("; ")}else O.detail&&(E=O.detail);h.add({severity:"error",summary:r("common.error"),detail:E,life:7e3})}}};return(d,v)=>{const A=B("Toast"),J=B("router-link");return s(),m(_,null,[x(A),v[6]||(v[6]=D()),o.value?(s(),m("div",Dt,[l("p",null,p(d.$t("experienceDetail.loadingDetails")),1)])):i.value?(s(),m("div",Ot,[l("div",Lt,[l("div",Bt,[l("h1",Ct,p(i.value.title),1),l("div",Tt,[l("span",$t,[v[3]||(v[3]=l("i",{class:"pi pi-map-marker"},null,-1)),D(" "+p(i.value.location),1)])])]),x(T(pe),{value:i.value.experienceImages,numVisible:5,containerStyle:"max-width: 100%",showThumbnails:!1,showIndicators:!0,circular:!0,autoPlay:!0,transitionInterval:3e3},{item:z(y=>[l("img",{src:y.item.url,alt:i.value.title,style:{width:"100%",display:"block","border-radius":"12px"}},null,8,Vt)]),_:1},8,["value"]),l("div",Nt,[l("h2",null,p(d.$t("experienceDetail.descriptionTitle")),1),l("p",null,p(i.value.description),1)]),l("div",Kt,[l("h2",null,p(d.$t("experienceDetail.includesTitle")),1),l("ul",null,[(s(!0),m(_,null,Y(i.value.includes,(y,I)=>(s(),m("li",{key:I},[v[4]||(v[4]=l("i",{class:"pi pi-check-circle",style:{color:"#2c8a8a"}},null,-1)),D(" "+p(y.description),1)]))),128))])]),l("div",Et,[l("h2",null,p(d.$t("experienceDetail.schedulesTitle")),1),l("p",null,[l("strong",null,p(d.$t("experienceDetail.frequencyLabel")),1),D(" "+p(i.value.frequencies),1)]),l("p",null,[l("strong",null,p(d.$t("experienceDetail.availableSchedulesLabel")),1),D(" "+p(i.value.schedule.map(y=>y.time).join(", ")),1)])])]),l("div",jt,[l("div",Ft,[l("h3",_t,[D("S/ "+p(i.value.price)+" ",1),v[5]||(v[5]=l("span",{class:"price-unit"},"/ persona",-1))]),l("div",zt,[l("div",Rt,[l("label",null,p(d.$t("experienceDetail.dateLabel")),1),x(T(je),{modelValue:a.value,"onUpdate:modelValue":v[0]||(v[0]=y=>a.value=y),placeholder:d.$t("experienceDetail.datePlaceholder"),dateFormat:"dd/mm/yy",class:"w-full",disabledDays:C.value,minDate:new Date,selectionMode:"single",touchUI:""},null,8,["modelValue","placeholder","disabledDays","minDate"])]),l("div",Ht,[l("label",null,p(d.$t("experienceDetail.scheduleLabel")),1),x(T(Fe),{modelValue:c.value,"onUpdate:modelValue":v[1]||(v[1]=y=>c.value=y),options:M.value,placeholder:d.$t("experienceDetail.schedulePlaceholder"),class:"w-full"},null,8,["modelValue","options","placeholder"])]),l("div",Mt,[l("label",null,p(d.$t("experienceDetail.numberOfPeopleLabel")),1),x(T(_e),{modelValue:f.value,"onUpdate:modelValue":v[2]||(v[2]=y=>f.value=y),mode:"decimal",showButtons:"",min:1,max:10,class:"w-full"},null,8,["modelValue"])])]),l("div",Ut,[l("span",null,p(d.$t("experienceDetail.totalLabel")),1),l("span",null,"S/ "+p(ve.value.toFixed(2)),1)]),x(T(ze),{label:"$t('experienceDetail.bookNowButton')",class:"w-full booking-button",onClick:be})])])])):(s(),m("div",Gt,[l("h2",null,p(d.$t("experienceDetail.notFoundTitle")),1),l("p",null,p(d.$t("experienceDetail.notFoundMessage")),1),x(J,{to:"/"},{default:z(()=>[D(p(d.$t("experienceDetail.backToHomeButton")),1)]),_:1})]))],64)}}},Xt=Be(qt,[["__scopeId","data-v-4fa7a38a"]]);export{Xt as default};
