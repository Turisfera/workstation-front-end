import{c as ot,B as lt,F as st,s as ut,R as H,a as dt,b as ct,d as ht,e as Q,f as X,g as N,Z as K,u as _,h as mt,i as Y,j as pt,k as vt,l as bt,m as ft,n as g,o as V,p as J,r as M,q as $,t as m,v as s,w as o,x as p,y as S,z as d,A as b,C as f,D as R,E as z,G as P,H as w,I as D,T as gt,_ as yt,J as B,K as It,L as wt,M as xt,N as y,O as x,P as L,Q as St,S as kt,U as Pt}from"./index-DAh2BVXw.js";var At=ot`
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
`,Ct={mask:"p-galleria-mask p-overlay-mask p-overlay-mask-enter",root:function(e){var i=e.instance,n=i.$attrs.showThumbnails&&i.getPositionClass("p-galleria-thumbnails",i.$attrs.thumbnailsPosition),r=i.$attrs.showIndicators&&i.getPositionClass("p-galleria-indicators",i.$attrs.indicatorsPosition);return["p-galleria p-component",{"p-galleria-fullscreen":i.$attrs.fullScreen,"p-galleria-inset-indicators":i.$attrs.showIndicatorsOnItem,"p-galleria-hover-navigators":i.$attrs.showItemNavigatorsOnHover&&!i.$attrs.fullScreen},n,r]},closeButton:"p-galleria-close-button",closeIcon:"p-galleria-close-icon",header:"p-galleria-header",content:"p-galleria-content",footer:"p-galleria-footer",itemsContainer:"p-galleria-items-container",items:"p-galleria-items",prevButton:function(e){var i=e.instance;return["p-galleria-prev-button p-galleria-nav-button",{"p-disabled":i.isNavBackwardDisabled}]},prevIcon:"p-galleria-prev-icon",item:"p-galleria-item",nextButton:function(e){var i=e.instance;return["p-galleria-next-button p-galleria-nav-button",{"p-disabled":i.isNavForwardDisabled}]},nextIcon:"p-galleria-next-icon",caption:"p-galleria-caption",indicatorList:"p-galleria-indicator-list",indicator:function(e){var i=e.instance,n=e.index;return["p-galleria-indicator",{"p-galleria-indicator-active":i.isIndicatorItemActive(n)}]},indicatorButton:"p-galleria-indicator-button",thumbnails:"p-galleria-thumbnails",thumbnailContent:"p-galleria-thumbnails-content",thumbnailPrevButton:function(e){var i=e.instance;return["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button",{"p-disabled":i.isNavBackwardDisabled}]},thumbnailPrevIcon:"p-galleria-thumbnail-prev-icon",thumbnailsViewport:"p-galleria-thumbnails-viewport",thumbnailItems:"p-galleria-thumbnail-items",thumbnailItem:function(e){var i=e.instance,n=e.index,r=e.activeIndex;return["p-galleria-thumbnail-item",{"p-galleria-thumbnail-item-current":r===n,"p-galleria-thumbnail-item-active":i.isItemActive(n),"p-galleria-thumbnail-item-start":i.firstItemAciveIndex()===n,"p-galleria-thumbnail-item-end":i.lastItemActiveIndex()===n}]},thumbnail:"p-galleria-thumbnail",thumbnailNextButton:function(e){var i=e.instance;return["p-galleria-thumbnail-next-button p-galleria-thumbnail-nav-button",{"p-disabled":i.isNavForwardDisabled}]},thumbnailNextIcon:"p-galleria-thumbnail-next-icon"},Ot=lt.extend({name:"galleria",style:At,classes:Ct}),Bt={name:"BaseGalleria",extends:N,props:{id:{type:String,default:null},value:{type:Array,default:null},activeIndex:{type:Number,default:0},fullScreen:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},numVisible:{type:Number,default:3},responsiveOptions:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!1},showThumbnailNavigators:{type:Boolean,default:!0},showItemNavigatorsOnHover:{type:Boolean,default:!1},changeItemOnIndicatorHover:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},autoPlay:{type:Boolean,default:!1},transitionInterval:{type:Number,default:4e3},showThumbnails:{type:Boolean,default:!0},thumbnailsPosition:{type:String,default:"bottom"},verticalThumbnailViewPortHeight:{type:String,default:"300px"},showIndicators:{type:Boolean,default:!1},showIndicatorsOnItem:{type:Boolean,default:!1},indicatorsPosition:{type:String,default:"bottom"},baseZIndex:{type:Number,default:0},maskClass:{type:String,default:null},containerStyle:{type:null,default:null},containerClass:{type:null,default:null},containerProps:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},ariaLabel:{type:String,default:null},ariaRoledescription:{type:String,default:null}},style:Ot,provide:function(){return{$pcGalleria:this,$parentInstance:this}}};function k(t){return Dt(t)||Vt(t)||Tt(t)||Lt()}function Lt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Tt(t,e){if(t){if(typeof t=="string")return E(t,e);var i={}.toString.call(t).slice(8,-1);return i==="Object"&&t.constructor&&(i=t.constructor.name),i==="Map"||i==="Set"?Array.from(t):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?E(t,e):void 0}}function Vt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Dt(t){if(Array.isArray(t))return E(t)}function E(t,e){(e==null||e>t.length)&&(e=t.length);for(var i=0,n=Array(e);i<e;i++)n[i]=t[i];return n}var tt={name:"GalleriaItem",hostName:"Galleria",extends:N,emits:["start-slideshow","stop-slideshow","update:activeIndex"],props:{circular:{type:Boolean,default:!1},activeIndex:{type:Number,default:0},value:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},slideShowActive:{type:Boolean,default:!0},changeItemOnIndicatorHover:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!1},templates:{type:null,default:null},id:{type:String,default:null}},mounted:function(){this.autoPlay&&this.$emit("start-slideshow")},methods:{getIndicatorPTOptions:function(e){return{context:{highlighted:this.activeIndex===e}}},next:function(){var e=this.activeIndex+1,i=this.circular&&this.value.length-1===this.activeIndex?0:e;this.$emit("update:activeIndex",i)},prev:function(){var e=this.activeIndex!==0?this.activeIndex-1:0,i=this.circular&&this.activeIndex===0?this.value.length-1:e;this.$emit("update:activeIndex",i)},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},navBackward:function(e){this.stopSlideShow(),this.prev(),e&&e.cancelable&&e.preventDefault()},navForward:function(e){this.stopSlideShow(),this.next(),e&&e.cancelable&&e.preventDefault()},onIndicatorClick:function(e){this.stopSlideShow(),this.$emit("update:activeIndex",e)},onIndicatorMouseEnter:function(e){this.changeItemOnIndicatorHover&&(this.stopSlideShow(),this.$emit("update:activeIndex",e))},onIndicatorKeyDown:function(e,i){switch(e.code){case"Enter":case"NumpadEnter":case"Space":this.stopSlideShow(),this.$emit("update:activeIndex",i),e.preventDefault();break;case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),e.preventDefault();break;case"End":this.onEndKey(),e.preventDefault();break;case"Tab":this.onTabKey();break;case"ArrowDown":case"ArrowUp":case"PageUp":case"PageDown":e.preventDefault();break}},onRightKey:function(){var e=k(g(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,i+1===e.length?e.length-1:i+1)},onLeftKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)},onHomeKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)},onEndKey:function(){var e=k(g(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,e.length-1)},onTabKey:function(){var e=k(g(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=e.findIndex(function(a){return J(a,"data-p-active")===!0}),n=V(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]'),r=e.findIndex(function(a){return a===n.parentElement});e[r].children[0].tabIndex="-1",e[i].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var e=k(g(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=V(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]');return e.findIndex(function(n){return n===i.parentElement})},changedFocusedIndicator:function(e,i){var n=k(g(this.$refs.indicatorContent,'[data-pc-section="indicator"]'));n[e].children[0].tabIndex="-1",n[i].children[0].tabIndex="0",n[i].children[0].focus()},isIndicatorItemActive:function(e){return this.activeIndex===e},ariaSlideNumber:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,e):void 0},ariaPageLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,e):void 0}},computed:{activeItem:function(){return this.value[this.activeIndex]},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.activeIndex===0},isNavForwardDisabled:function(){return!this.circular&&this.activeIndex===this.value.length-1}},components:{ChevronLeftIcon:X,ChevronRightIcon:Q},directives:{ripple:H}},Nt=["disabled"],$t=["id","aria-label","aria-roledescription"],Kt=["disabled"],jt=["aria-label","aria-selected","aria-controls","onClick","onMouseenter","onKeydown","data-p-active"],Et=["tabindex"];function Ft(t,e,i,n,r,a){var v=$("ripple");return s(),m("div",d({class:t.cx("itemsContainer")},t.ptm("itemsContainer")),[o("div",d({class:t.cx("items")},t.ptm("items")),[i.showItemNavigators?S((s(),m("button",d({key:0,type:"button",class:t.cx("prevButton"),onClick:e[0]||(e[0]=function(c){return a.navBackward(c)}),disabled:a.isNavBackwardDisabled},t.ptm("prevButton"),{"data-pc-group-section":"itemnavigator"}),[(s(),b(f(i.templates.previousitemicon||"ChevronLeftIcon"),d({class:t.cx("prevIcon")},t.ptm("prevIcon")),null,16,["class"]))],16,Nt)),[[v]]):p("",!0),o("div",d({id:i.id+"_item_"+i.activeIndex,class:t.cx("item"),role:"group","aria-label":a.ariaSlideNumber(i.activeIndex+1),"aria-roledescription":a.ariaSlideLabel},t.ptm("item")),[i.templates.item?(s(),b(f(i.templates.item),{key:0,item:a.activeItem},null,8,["item"])):p("",!0)],16,$t),i.showItemNavigators?S((s(),m("button",d({key:1,type:"button",class:t.cx("nextButton"),onClick:e[1]||(e[1]=function(c){return a.navForward(c)}),disabled:a.isNavForwardDisabled},t.ptm("nextButton"),{"data-pc-group-section":"itemnavigator"}),[(s(),b(f(i.templates.nextitemicon||"ChevronRightIcon"),d({class:t.cx("nextIcon")},t.ptm("nextIcon")),null,16,["class"]))],16,Kt)),[[v]]):p("",!0),i.templates.caption?(s(),m("div",d({key:2,class:t.cx("caption")},t.ptm("caption")),[i.templates.caption?(s(),b(f(i.templates.caption),{key:0,item:a.activeItem},null,8,["item"])):p("",!0)],16)):p("",!0)],16),i.showIndicators?(s(),m("ul",d({key:0,ref:"indicatorContent",class:t.cx("indicatorList")},t.ptm("indicatorList")),[(s(!0),m(R,null,z(i.value,function(c,u){return s(),m("li",d({key:"p-galleria-indicator-".concat(u),class:t.cx("indicator",{index:u}),"aria-label":a.ariaPageLabel(u+1),"aria-selected":i.activeIndex===u,"aria-controls":i.id+"_item_"+u,onClick:function(l){return a.onIndicatorClick(u)},onMouseenter:function(l){return a.onIndicatorMouseEnter(u)},onKeydown:function(l){return a.onIndicatorKeyDown(l,u)}},{ref_for:!0},t.ptm("indicator",a.getIndicatorPTOptions(u)),{"data-p-active":a.isIndicatorItemActive(u)}),[i.templates.indicator?p("",!0):(s(),m("button",d({key:0,type:"button",tabindex:i.activeIndex===u?"0":"-1",class:t.cx("indicatorButton")},{ref_for:!0},t.ptm("indicatorButton",a.getIndicatorPTOptions(u))),null,16,Et)),i.templates.indicator?(s(),b(f(i.templates.indicator),{key:1,index:u,activeIndex:i.activeIndex,tabindex:i.activeIndex===u?"0":"-1"},null,8,["index","activeIndex","tabindex"])):p("",!0)],16,jt)}),128))],16)):p("",!0)],16)}tt.render=Ft;function j(t){return _t(t)||zt(t)||Rt(t)||Ht()}function Ht(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Rt(t,e){if(t){if(typeof t=="string")return F(t,e);var i={}.toString.call(t).slice(8,-1);return i==="Object"&&t.constructor&&(i=t.constructor.name),i==="Map"||i==="Set"?Array.from(t):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?F(t,e):void 0}}function zt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function _t(t){if(Array.isArray(t))return F(t)}function F(t,e){(e==null||e>t.length)&&(e=t.length);for(var i=0,n=Array(e);i<e;i++)n[i]=t[i];return n}var et={name:"GalleriaThumbnails",hostName:"Galleria",extends:N,emits:["stop-slideshow","update:activeIndex"],props:{containerId:{type:String,default:null},value:{type:Array,default:null},numVisible:{type:Number,default:3},activeIndex:{type:Number,default:0},isVertical:{type:Boolean,default:!1},slideShowActive:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},responsiveOptions:{type:Array,default:null},contentHeight:{type:String,default:"300px"},showThumbnailNavigators:{type:Boolean,default:!0},templates:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null}},startPos:null,thumbnailsStyle:null,sortedResponsiveOptions:null,data:function(){return{d_numVisible:this.numVisible,d_oldNumVisible:this.numVisible,d_activeIndex:this.activeIndex,d_oldActiveItemIndex:this.activeIndex,totalShiftedItems:0,page:0}},watch:{numVisible:function(e,i){this.d_numVisible=e,this.d_oldNumVisible=i},activeIndex:function(e,i){this.d_activeIndex=e,this.d_oldActiveItemIndex=i}},mounted:function(){this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()},updated:function(){var e=this.totalShiftedItems;(this.d_oldNumVisible!==this.d_numVisible||this.d_oldActiveItemIndex!==this.d_activeIndex)&&(this.d_activeIndex<=this.getMedianItemIndex()?e=0:this.value.length-this.d_numVisible+this.getMedianItemIndex()<this.d_activeIndex?e=this.d_numVisible-this.value.length:this.value.length-this.d_numVisible<this.d_activeIndex&&this.d_numVisible%2===0?e=this.d_activeIndex*-1+this.getMedianItemIndex()+1:e=this.d_activeIndex*-1+this.getMedianItemIndex(),e!==this.totalShiftedItems&&(this.totalShiftedItems=e),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(e*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(e*(100/this.d_numVisible),"%, 0, 0)"),this.d_oldActiveItemIndex!==this.d_activeIndex&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&M(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.d_oldActiveItemIndex=this.d_activeIndex,this.d_oldNumVisible=this.d_numVisible)},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.thumbnailsStyle&&this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle)},methods:{step:function(e){var i=this.totalShiftedItems+e;e<0&&-1*i+this.d_numVisible>this.value.length-1?i=this.d_numVisible-this.value.length:e>0&&i>0&&(i=0),this.circular&&(e<0&&this.value.length-1===this.d_activeIndex?i=0:e>0&&this.d_activeIndex===0&&(i=this.d_numVisible-this.value.length)),this.$refs.itemsContainer&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&M(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(i*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(i*(100/this.d_numVisible),"%, 0, 0)"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=i},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},getMedianItemIndex:function(){var e=Math.floor(this.d_numVisible/2);return this.d_numVisible%2?e:e-1},navBackward:function(e){this.stopSlideShow();var i=this.d_activeIndex!==0?this.d_activeIndex-1:0,n=i+this.totalShiftedItems;this.d_numVisible-n-1>this.getMedianItemIndex()&&(-1*this.totalShiftedItems!==0||this.circular)&&this.step(1);var r=this.circular&&this.d_activeIndex===0?this.value.length-1:i;this.$emit("update:activeIndex",r),e.cancelable&&e.preventDefault()},navForward:function(e){this.stopSlideShow();var i=this.d_activeIndex===this.value.length-1?this.value.length-1:this.d_activeIndex+1;i+this.totalShiftedItems>this.getMedianItemIndex()&&(-1*this.totalShiftedItems<this.getTotalPageNumber()-1||this.circular)&&this.step(-1);var n=this.circular&&this.value.length-1===this.d_activeIndex?0:i;this.$emit("update:activeIndex",n),e.cancelable&&e.preventDefault()},onItemClick:function(e){this.stopSlideShow();var i=e;if(i!==this.d_activeIndex){var n=i+this.totalShiftedItems,r=0;i<this.d_activeIndex?(r=this.d_numVisible-n-1-this.getMedianItemIndex(),r>0&&-1*this.totalShiftedItems!==0&&this.step(r)):(r=this.getMedianItemIndex()-n,r<0&&-1*this.totalShiftedItems<this.getTotalPageNumber()-1&&this.step(r)),this.$emit("update:activeIndex",i)}},onThumbnailKeydown:function(e,i){switch((e.code==="Enter"||e.code==="NumpadEnter"||e.code==="Space")&&(this.onItemClick(i),e.preventDefault()),e.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),e.preventDefault();break;case"End":this.onEndKey(),e.preventDefault();break;case"ArrowUp":case"ArrowDown":e.preventDefault();break;case"Tab":this.onTabKey();break}},onRightKey:function(){var e=g(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,i+1===e.length?e.length-1:i+1)},onLeftKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)},onHomeKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)},onEndKey:function(){var e=g(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,e.length-1)},onTabKey:function(){var e=j(g(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),i=e.findIndex(function(a){return J(a,"data-p-active")===!0}),n=V(this.$refs.itemsContainer,'[tabindex="0"]'),r=e.findIndex(function(a){return a===n.parentElement});e[r].children[0].tabIndex="-1",e[i].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var e=j(g(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),i=V(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"] > [tabindex="0"]');return e.findIndex(function(n){return n===i.parentElement})},changedFocusedIndicator:function(e,i){var n=g(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]');n[e].children[0].tabIndex="-1",n[i].children[0].tabIndex="0",n[i].children[0].focus()},onTransitionEnd:function(e){this.$refs.itemsContainer&&e.propertyName==="transform"&&(document.body.setAttribute("data-p-items-hidden","true"),!this.isUnstyled&&Y(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="")},onTouchStart:function(e){var i=e.changedTouches[0];this.startPos={x:i.pageX,y:i.pageY}},onTouchMove:function(e){e.cancelable&&e.preventDefault()},onTouchEnd:function(e){var i=e.changedTouches[0];this.isVertical?this.changePageOnTouch(e,i.pageY-this.startPos.y):this.changePageOnTouch(e,i.pageX-this.startPos.x)},changePageOnTouch:function(e,i){var n=10;Math.abs(i)<n||(i<0?this.navForward(e):this.navBackward(e))},getTotalPageNumber:function(){return this.value.length>this.d_numVisible?this.value.length-this.d_numVisible+1:0},createStyle:function(){if(!this.thumbnailsStyle){var e;this.thumbnailsStyle=document.createElement("style"),this.thumbnailsStyle.type="text/css",vt(this.thumbnailsStyle,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.body.appendChild(this.thumbnailsStyle)}var i=`
                #`.concat(this.containerId,` [data-pc-section="thumbnailitem"] {
                    flex: 1 0 `).concat(100/this.d_numVisible,`%
                }
            `);if(this.responsiveOptions&&!this.isUnstyled){this.sortedResponsiveOptions=j(this.responsiveOptions);var n=bt();this.sortedResponsiveOptions.sort(function(v,c){var u=v.breakpoint,h=c.breakpoint;return ft(u,h,-1,n)});for(var r=0;r<this.sortedResponsiveOptions.length;r++){var a=this.sortedResponsiveOptions[r];i+=`
                        @media screen and (max-width: `.concat(a.breakpoint,`) {
                            #`).concat(this.containerId,` .p-galleria-thumbnail-item {
                                flex: 1 0 `).concat(100/a.numVisible,`%
                            }
                        }
                    `)}}this.thumbnailsStyle.innerHTML=i},calculatePosition:function(){if(this.$refs.itemsContainer&&this.sortedResponsiveOptions){for(var e=window.innerWidth,i={numVisible:this.numVisible},n=0;n<this.sortedResponsiveOptions.length;n++){var r=this.sortedResponsiveOptions[n];parseInt(r.breakpoint,10)>=e&&(i=r)}this.d_numVisible!==i.numVisible&&(this.d_numVisible=i.numVisible)}},bindDocumentListeners:function(){var e=this;this.documentResizeListener||(this.documentResizeListener=function(){e.calculatePosition()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)},firstItemAciveIndex:function(){return this.totalShiftedItems*-1},lastItemActiveIndex:function(){return this.firstItemAciveIndex()+this.d_numVisible-1},isItemActive:function(e){return this.firstItemAciveIndex()<=e&&this.lastItemActiveIndex()>=e},ariaPageLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,e):void 0}},computed:{ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.d_activeIndex===0||this.value.length<=this.d_numVisible},isNavForwardDisabled:function(){return!this.circular&&this.d_activeIndex===this.value.length-1||this.value.length<=this.d_numVisible}},components:{ChevronLeftIcon:X,ChevronRightIcon:Q,ChevronUpIcon:ht,ChevronDownIcon:ct},directives:{ripple:H}};function A(t){"@babel/helpers - typeof";return A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(t)}function G(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),i.push.apply(i,n)}return i}function T(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?G(Object(i),!0).forEach(function(n){Mt(t,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):G(Object(i)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(i,n))})}return t}function Mt(t,e,i){return(e=Gt(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Gt(t){var e=Ut(t,"string");return A(e)=="symbol"?e:e+""}function Ut(t,e){if(A(t)!="object"||!t)return t;var i=t[Symbol.toPrimitive];if(i!==void 0){var n=i.call(t,e);if(A(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var qt=["disabled","aria-label"],Zt=["data-p-active","aria-selected","aria-controls","onKeydown","data-p-galleria-thumbnail-item-current","data-p-galleria-thumbnail-item-active","data-p-galleria-thumbnail-item-start","data-p-galleria-thumbnail-item-end"],Wt=["tabindex","aria-label","aria-current","onClick"],Qt=["disabled","aria-label"];function Xt(t,e,i,n,r,a){var v=$("ripple");return s(),m("div",d({class:t.cx("thumbnails")},t.ptm("thumbnails")),[o("div",d({class:t.cx("thumbnailContent")},t.ptm("thumbnailContent")),[i.showThumbnailNavigators?S((s(),m("button",d({key:0,class:t.cx("thumbnailPrevButton"),disabled:a.isNavBackwardDisabled,type:"button","aria-label":a.ariaPrevButtonLabel,onClick:e[0]||(e[0]=function(c){return a.navBackward(c)})},T(T({},i.prevButtonProps),t.ptm("thumbnailPrevButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(s(),b(f(i.templates.previousthumbnailicon||(i.isVertical?"ChevronUpIcon":"ChevronLeftIcon")),d({class:t.cx("thumbnailPrevIcon")},t.ptm("thumbnailPrevIcon")),null,16,["class"]))],16,qt)),[[v]]):p("",!0),o("div",d({class:t.cx("thumbnailsViewport"),style:{height:i.isVertical?i.contentHeight:""}},t.ptm("thumbnailsViewport")),[o("div",d({ref:"itemsContainer",class:t.cx("thumbnailItems"),role:"tablist",onTransitionend:e[1]||(e[1]=function(c){return a.onTransitionEnd(c)}),onTouchstart:e[2]||(e[2]=function(c){return a.onTouchStart(c)}),onTouchmove:e[3]||(e[3]=function(c){return a.onTouchMove(c)}),onTouchend:e[4]||(e[4]=function(c){return a.onTouchEnd(c)})},t.ptm("thumbnailItems")),[(s(!0),m(R,null,z(i.value,function(c,u){return s(),m("div",d({key:"p-galleria-thumbnail-item-".concat(u),class:t.cx("thumbnailItem",{index:u,activeIndex:i.activeIndex}),role:"tab","data-p-active":i.activeIndex===u,"aria-selected":i.activeIndex===u,"aria-controls":i.containerId+"_item_"+u,onKeydown:function(l){return a.onThumbnailKeydown(l,u)}},{ref_for:!0},t.ptm("thumbnailItem"),{"data-p-galleria-thumbnail-item-current":i.activeIndex===u,"data-p-galleria-thumbnail-item-active":a.isItemActive(u),"data-p-galleria-thumbnail-item-start":a.firstItemAciveIndex()===u,"data-p-galleria-thumbnail-item-end":a.lastItemActiveIndex()===u}),[o("div",d({class:t.cx("thumbnail"),tabindex:i.activeIndex===u?"0":"-1","aria-label":a.ariaPageLabel(u+1),"aria-current":i.activeIndex===u?"page":void 0,onClick:function(l){return a.onItemClick(u)}},{ref_for:!0},t.ptm("thumbnail")),[i.templates.thumbnail?(s(),b(f(i.templates.thumbnail),{key:0,item:c},null,8,["item"])):p("",!0)],16,Wt)],16,Zt)}),128))],16)],16),i.showThumbnailNavigators?S((s(),m("button",d({key:1,class:t.cx("thumbnailNextButton"),disabled:a.isNavForwardDisabled,type:"button","aria-label":a.ariaNextButtonLabel,onClick:e[5]||(e[5]=function(c){return a.navForward(c)})},T(T({},i.nextButtonProps),t.ptm("thumbnailNextButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(s(),b(f(i.templates.nextthumbnailicon||(i.isVertical?"ChevronDownIcon":"ChevronRightIcon")),d({class:t.cx("thumbnailNextIcon")},t.ptm("thumbnailNextIcon")),null,16,["class"]))],16,Qt)),[[v]]):p("",!0)],16)],16)}et.render=Xt;function C(t){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(t)}function U(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),i.push.apply(i,n)}return i}function q(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?U(Object(i),!0).forEach(function(n){Yt(t,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):U(Object(i)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(i,n))})}return t}function Yt(t,e,i){return(e=Jt(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Jt(t){var e=te(t,"string");return C(e)=="symbol"?e:e+""}function te(t,e){if(C(t)!="object"||!t)return t;var i=t[Symbol.toPrimitive];if(i!==void 0){var n=i.call(t,e);if(C(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var it={name:"GalleriaContent",hostName:"Galleria",extends:N,inheritAttrs:!1,interval:null,emits:["activeitem-change","mask-hide"],data:function(){return{activeIndex:this.$attrs.activeIndex,numVisible:this.$attrs.numVisible,slideShowActive:!1}},watch:{"$attrs.value":function(e){e&&e.length<this.numVisible&&(this.numVisible=e.length)},"$attrs.activeIndex":function(e){this.activeIndex=e},"$attrs.numVisible":function(e){this.numVisible=e},"$attrs.autoPlay":function(e){e?this.startSlideShow():this.stopSlideShow()}},updated:function(){this.$emit("activeitem-change",this.activeIndex)},beforeUnmount:function(){this.slideShowActive&&this.stopSlideShow()},methods:{getPTOptions:function(e){return this.ptm(e,{props:q(q({},this.$attrs),{},{pt:this.pt,unstyled:this.unstyled})})},isAutoPlayActive:function(){return this.slideShowActive},startSlideShow:function(){var e=this;this.interval=setInterval(function(){var i=e.$attrs.circular&&e.$attrs.value.length-1===e.activeIndex?0:e.activeIndex+1;e.activeIndex=i},this.$attrs.transitionInterval),this.slideShowActive=!0},stopSlideShow:function(){this.interval&&clearInterval(this.interval),this.slideShowActive=!1},getPositionClass:function(e,i){var n=["top","left","bottom","right"],r=n.find(function(a){return a===i});return r?"".concat(e,"-").concat(r):""},isVertical:function(){return this.$attrs.thumbnailsPosition==="left"||this.$attrs.thumbnailsPosition==="right"}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{GalleriaItem:tt,GalleriaThumbnails:et,TimesIcon:dt},directives:{ripple:H}};function O(t){"@babel/helpers - typeof";return O=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(t)}function Z(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),i.push.apply(i,n)}return i}function W(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?Z(Object(i),!0).forEach(function(n){ee(t,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):Z(Object(i)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(i,n))})}return t}function ee(t,e,i){return(e=ie(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function ie(t){var e=ne(t,"string");return O(e)=="symbol"?e:e+""}function ne(t,e){if(O(t)!="object"||!t)return t;var i=t[Symbol.toPrimitive];if(i!==void 0){var n=i.call(t,e);if(O(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var ae=["id","aria-label","aria-roledescription"],re=["aria-label"],oe=["aria-live"];function le(t,e,i,n,r,a){var v=P("GalleriaItem"),c=P("GalleriaThumbnails"),u=$("ripple");return t.$attrs.value&&t.$attrs.value.length>0?(s(),m("div",d({key:0,id:t.$id,role:"region",class:[t.cx("root"),t.$attrs.containerClass],style:t.$attrs.containerStyle,"aria-label":t.$attrs.ariaLabel,"aria-roledescription":t.$attrs.ariaRoledescription},W(W({},t.$attrs.containerProps),a.getPTOptions("root"))),[t.$attrs.fullScreen?S((s(),m("button",d({key:0,autofocus:"",type:"button",class:t.cx("closeButton"),"aria-label":a.closeAriaLabel,onClick:e[0]||(e[0]=function(h){return t.$emit("mask-hide")})},a.getPTOptions("closeButton")),[(s(),b(f(t.$attrs.templates.closeicon||"TimesIcon"),d({class:t.cx("closeIcon")},a.getPTOptions("closeIcon")),null,16,["class"]))],16,re)),[[u]]):p("",!0),t.$attrs.templates&&t.$attrs.templates.header?(s(),m("div",d({key:1,class:t.cx("header")},a.getPTOptions("header")),[(s(),b(f(t.$attrs.templates.header)))],16)):p("",!0),o("div",d({class:t.cx("content"),"aria-live":t.$attrs.autoPlay?"polite":"off"},a.getPTOptions("content")),[w(v,{id:t.$id,activeIndex:r.activeIndex,"onUpdate:activeIndex":e[1]||(e[1]=function(h){return r.activeIndex=h}),slideShowActive:r.slideShowActive,"onUpdate:slideShowActive":e[2]||(e[2]=function(h){return r.slideShowActive=h}),value:t.$attrs.value,circular:t.$attrs.circular,templates:t.$attrs.templates,showIndicators:t.$attrs.showIndicators,changeItemOnIndicatorHover:t.$attrs.changeItemOnIndicatorHover,showItemNavigators:t.$attrs.showItemNavigators,autoPlay:t.$attrs.autoPlay,onStartSlideshow:a.startSlideShow,onStopSlideshow:a.stopSlideShow,pt:t.pt,unstyled:t.unstyled},null,8,["id","activeIndex","slideShowActive","value","circular","templates","showIndicators","changeItemOnIndicatorHover","showItemNavigators","autoPlay","onStartSlideshow","onStopSlideshow","pt","unstyled"]),t.$attrs.showThumbnails?(s(),b(c,{key:0,activeIndex:r.activeIndex,"onUpdate:activeIndex":e[3]||(e[3]=function(h){return r.activeIndex=h}),slideShowActive:r.slideShowActive,"onUpdate:slideShowActive":e[4]||(e[4]=function(h){return r.slideShowActive=h}),containerId:t.$id,value:t.$attrs.value,templates:t.$attrs.templates,numVisible:r.numVisible,responsiveOptions:t.$attrs.responsiveOptions,circular:t.$attrs.circular,isVertical:a.isVertical(),contentHeight:t.$attrs.verticalThumbnailViewPortHeight,showThumbnailNavigators:t.$attrs.showThumbnailNavigators,prevButtonProps:t.$attrs.prevButtonProps,nextButtonProps:t.$attrs.nextButtonProps,onStopSlideshow:a.stopSlideShow,pt:t.pt,unstyled:t.unstyled},null,8,["activeIndex","slideShowActive","containerId","value","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","prevButtonProps","nextButtonProps","onStopSlideshow","pt","unstyled"])):p("",!0)],16,oe),t.$attrs.templates&&t.$attrs.templates.footer?(s(),m("div",d({key:2,class:t.cx("footer")},a.getPTOptions("footer")),[(s(),b(f(t.$attrs.templates.footer)))],16)):p("",!0)],16,ae)):p("",!0)}it.render=le;var nt={name:"Galleria",extends:Bt,inheritAttrs:!1,emits:["update:activeIndex","update:visible"],container:null,mask:null,documentKeydownListener:null,data:function(){return{containerVisible:this.visible,target:null}},updated:function(){this.fullScreen&&this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.fullScreen&&_(),this.mask=null,this.container&&(K.clear(this.container),this.container=null)},methods:{onBeforeEnter:function(e){K.set("modal",e,this.baseZIndex||this.$primevue.config.zIndex.modal)},onEnter:function(e){this.target=document.activeElement,this.mask.style.zIndex=String(parseInt(e.style.zIndex,10)-1),pt(),this.focus(),this.bindGlobalListeners()},onBeforeLeave:function(){!this.isUnstyled&&Y(this.mask,"p-overlay-mask-leave")},onLeave:function(){mt(this.target),this.target=null},onAfterLeave:function(e){K.clear(e),this.containerVisible=!1,_(),this.unbindGlobalListeners()},onActiveItemChange:function(e){this.activeIndex!==e&&this.$emit("update:activeIndex",e)},maskHide:function(){this.$emit("update:visible",!1)},containerRef:function(e){this.container=e},maskRef:function(e){this.mask=e},onKeyDown:function(e){e.code==="Escape"&&this.maskHide()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindGlobalListeners:function(){this.fullScreen&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.fullScreen&&this.unbindDocumentKeyDownListener()},focus:function(){var e=this.container.$el.querySelector("[autofocus]");e&&e.focus()}},components:{GalleriaContent:it,Portal:ut},directives:{focustrap:st}},se=["aria-modal"];function ue(t,e,i,n,r,a){var v=P("GalleriaContent"),c=P("Portal"),u=$("focustrap");return t.fullScreen?(s(),b(c,{key:0},{default:D(function(){return[r.containerVisible?(s(),m("div",d({key:0,ref:a.maskRef,class:[t.cx("mask"),t.maskClass],role:"dialog","aria-modal":t.fullScreen?"true":void 0},t.ptm("mask")),[w(gt,d({name:"p-galleria",onBeforeEnter:a.onBeforeEnter,onEnter:a.onEnter,onBeforeLeave:a.onBeforeLeave,onLeave:a.onLeave,onAfterLeave:a.onAfterLeave,appear:""},t.ptm("transition")),{default:D(function(){return[t.visible?S((s(),b(v,d({key:0,ref:a.containerRef,onMaskHide:a.maskHide,templates:t.$slots,onActiveitemChange:a.onActiveItemChange,pt:t.pt,unstyled:t.unstyled},t.$props),null,16,["onMaskHide","templates","onActiveitemChange","pt","unstyled"])),[[u]]):p("",!0)]}),_:1},16,["onBeforeEnter","onEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,se)):p("",!0)]}),_:1})):(s(),b(v,d({key:1,templates:t.$slots,onActiveitemChange:a.onActiveItemChange,pt:t.pt,unstyled:t.unstyled},t.$props),null,16,["templates","onActiveitemChange","pt","unstyled"]))}nt.render=ue;const de={key:0,class:"loading-container"},ce={key:1,class:"detail-container"},he={class:"info-column"},me={class:"header"},pe={class:"title"},ve={class:"meta-info"},be={class:"rating"},fe={class:"location"},ge=["src","alt"],ye={class:"section"},Ie={class:"section"},we={class:"section"},xe={class:"booking-column"},Se={class:"booking-card"},ke={class:"price"},Pe={class:"booking-form"},Ae={class:"form-group"},Ce={class:"form-group"},Oe={class:"total-price"},Be={key:2,class:"not-found-container"},Le={__name:"experience-detail-view.page",props:{id:{type:String,required:!0}},setup(t){const e=t,i=new xt,n=B(null),r=B(!0),a=B(null),v=B(1),c=It(()=>n.value?n.value.price*v.value:0);wt(async()=>{try{const h=await i.getById(e.id);h.data&&(n.value=h.data)}catch(h){console.error("Error al cargar la experiencia:",h),n.value=null}finally{r.value=!1}});const u=()=>{if(!a.value){alert("Por favor, selecciona una fecha para la reserva.");return}const h={experienceId:n.value.id,experienceTitle:n.value.title,date:a.value.toLocaleDateString("es-ES"),people:v.value,total:c.value};console.log("Datos de la reserva:",h),alert(`¡Gracias por tu interés! Funcionalidad de reserva en desarrollo.
Has seleccionado: ${h.people} persona(s) para el ${h.date}.`)};return(h,l)=>{const at=P("router-link");return r.value?(s(),m("div",de,l[2]||(l[2]=[o("p",null,"Cargando detalles de la experiencia...",-1)]))):n.value?(s(),m("div",ce,[o("div",he,[o("div",me,[o("h1",pe,y(n.value.title),1),o("div",ve,[o("span",be,"★ "+y(n.value.rating.toFixed(1)),1),o("span",fe,[l[3]||(l[3]=o("i",{class:"pi pi-map-marker"},null,-1)),x(" "+y(n.value.location),1)])])]),w(L(nt),{value:n.value.images,numVisible:5,containerStyle:"max-width: 100%",showThumbnails:!1,showIndicators:!0,circular:!0,autoPlay:!0,transitionInterval:3e3},{item:D(I=>[o("img",{src:I.item,alt:n.value.title,style:{width:"100%",display:"block","border-radius":"12px"}},null,8,ge)]),_:1},8,["value"]),o("div",ye,[l[4]||(l[4]=o("h2",null,"Descripción",-1)),o("p",null,y(n.value.description),1)]),o("div",Ie,[l[6]||(l[6]=o("h2",null,"¿Qué incluye?",-1)),o("ul",null,[(s(!0),m(R,null,z(n.value.includes,(I,rt)=>(s(),m("li",{key:rt},[l[5]||(l[5]=o("i",{class:"pi pi-check-circle",style:{color:"#2c8a8a"}},null,-1)),x(" "+y(I),1)]))),128))])]),o("div",we,[l[9]||(l[9]=o("h2",null,"Horarios y Frecuencia",-1)),o("p",null,[l[7]||(l[7]=o("strong",null,"Frecuencia:",-1)),x(" "+y(n.value.frequencies),1)]),o("p",null,[l[8]||(l[8]=o("strong",null,"Horarios de inicio disponibles:",-1)),x(" "+y(n.value.schedules.join(", ")),1)])])]),o("div",xe,[o("div",Se,[o("h3",ke,[x("S/ "+y(n.value.price)+" ",1),l[10]||(l[10]=o("span",{class:"price-unit"},"/ persona",-1))]),o("div",Pe,[o("div",Ae,[l[11]||(l[11]=o("label",null,"Fecha",-1)),w(L(St),{modelValue:a.value,"onUpdate:modelValue":l[0]||(l[0]=I=>a.value=I),placeholder:"Elige una fecha",dateFormat:"dd/mm/yy",class:"w-full"},null,8,["modelValue"])]),o("div",Ce,[l[12]||(l[12]=o("label",null,"Número de personas",-1)),w(L(kt),{modelValue:v.value,"onUpdate:modelValue":l[1]||(l[1]=I=>v.value=I),mode:"decimal",showButtons:"",min:1,max:10,class:"w-full"},null,8,["modelValue"])])]),o("div",Oe,[l[13]||(l[13]=o("span",null,"Total",-1)),o("span",null,"S/ "+y(c.value.toFixed(2)),1)]),w(L(Pt),{label:"Reservar ahora",class:"w-full booking-button",onClick:u})])])])):(s(),m("div",Be,[l[15]||(l[15]=o("h2",null,"Experiencia no encontrada",-1)),l[16]||(l[16]=o("p",null,"La experiencia que buscas no existe o no está disponible.",-1)),w(at,{to:"/"},{default:D(()=>l[14]||(l[14]=[x("Volver al inicio")])),_:1,__:[14]})]))}}},Ve=yt(Le,[["__scopeId","data-v-cccc36e6"]]);export{Ve as default};
