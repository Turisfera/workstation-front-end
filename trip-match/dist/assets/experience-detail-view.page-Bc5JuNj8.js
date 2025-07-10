import{c as ge,B as ye,F as Ie,s as we,R as Z,a as Se,b as xe,d as ke,e as le,f as se,g as R,Z as U,u as ee,h as Pe,i as ue,j as Ae,k as De,l as Oe,m as Le,n as S,o as F,p as ce,r as te,q as H,t as p,v as s,w as l,x as v,y as L,z as c,A as g,C as w,D as _,E as X,G as C,H as x,I as z,T as Ce,J as Be,_ as Te,K as P,L as $e,M as Ve,N as Ne,O as Ke,P as Ee,Q as je,S as Fe,U as D,V as m,W as T,X as _e,Y as ze,$ as Re,a0 as He}from"./index-DQXSWxVF.js";var Me=ge`
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
`,Ue={mask:"p-galleria-mask p-overlay-mask p-overlay-mask-enter",root:function(t){var i=t.instance,a=i.$attrs.showThumbnails&&i.getPositionClass("p-galleria-thumbnails",i.$attrs.thumbnailsPosition),o=i.$attrs.showIndicators&&i.getPositionClass("p-galleria-indicators",i.$attrs.indicatorsPosition);return["p-galleria p-component",{"p-galleria-fullscreen":i.$attrs.fullScreen,"p-galleria-inset-indicators":i.$attrs.showIndicatorsOnItem,"p-galleria-hover-navigators":i.$attrs.showItemNavigatorsOnHover&&!i.$attrs.fullScreen},a,o]},closeButton:"p-galleria-close-button",closeIcon:"p-galleria-close-icon",header:"p-galleria-header",content:"p-galleria-content",footer:"p-galleria-footer",itemsContainer:"p-galleria-items-container",items:"p-galleria-items",prevButton:function(t){var i=t.instance;return["p-galleria-prev-button p-galleria-nav-button",{"p-disabled":i.isNavBackwardDisabled}]},prevIcon:"p-galleria-prev-icon",item:"p-galleria-item",nextButton:function(t){var i=t.instance;return["p-galleria-next-button p-galleria-nav-button",{"p-disabled":i.isNavForwardDisabled}]},nextIcon:"p-galleria-next-icon",caption:"p-galleria-caption",indicatorList:"p-galleria-indicator-list",indicator:function(t){var i=t.instance,a=t.index;return["p-galleria-indicator",{"p-galleria-indicator-active":i.isIndicatorItemActive(a)}]},indicatorButton:"p-galleria-indicator-button",thumbnails:"p-galleria-thumbnails",thumbnailContent:"p-galleria-thumbnails-content",thumbnailPrevButton:function(t){var i=t.instance;return["p-galleria-thumbnail-prev-button p-galleria-thumbnail-nav-button",{"p-disabled":i.isNavBackwardDisabled}]},thumbnailPrevIcon:"p-galleria-thumbnail-prev-icon",thumbnailsViewport:"p-galleria-thumbnails-viewport",thumbnailItems:"p-galleria-thumbnail-items",thumbnailItem:function(t){var i=t.instance,a=t.index,o=t.activeIndex;return["p-galleria-thumbnail-item",{"p-galleria-thumbnail-item-current":o===a,"p-galleria-thumbnail-item-active":i.isItemActive(a),"p-galleria-thumbnail-item-start":i.firstItemAciveIndex()===a,"p-galleria-thumbnail-item-end":i.lastItemActiveIndex()===a}]},thumbnail:"p-galleria-thumbnail",thumbnailNextButton:function(t){var i=t.instance;return["p-galleria-thumbnail-next-button p-galleria-thumbnail-nav-button",{"p-disabled":i.isNavForwardDisabled}]},thumbnailNextIcon:"p-galleria-thumbnail-next-icon"},Ge=ye.extend({name:"galleria",style:Me,classes:Ue}),qe={name:"BaseGalleria",extends:R,props:{id:{type:String,default:null},value:{type:Array,default:null},activeIndex:{type:Number,default:0},fullScreen:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},numVisible:{type:Number,default:3},responsiveOptions:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!1},showThumbnailNavigators:{type:Boolean,default:!0},showItemNavigatorsOnHover:{type:Boolean,default:!1},changeItemOnIndicatorHover:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},autoPlay:{type:Boolean,default:!1},transitionInterval:{type:Number,default:4e3},showThumbnails:{type:Boolean,default:!0},thumbnailsPosition:{type:String,default:"bottom"},verticalThumbnailViewPortHeight:{type:String,default:"300px"},showIndicators:{type:Boolean,default:!1},showIndicatorsOnItem:{type:Boolean,default:!1},indicatorsPosition:{type:String,default:"bottom"},baseZIndex:{type:Number,default:0},maskClass:{type:String,default:null},containerStyle:{type:null,default:null},containerClass:{type:null,default:null},containerProps:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},ariaLabel:{type:String,default:null},ariaRoledescription:{type:String,default:null}},style:Ge,provide:function(){return{$pcGalleria:this,$parentInstance:this}}};function $(e){return Ye(e)||Xe(e)||Ze(e)||We()}function We(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ze(e,t){if(e){if(typeof e=="string")return q(e,t);var i={}.toString.call(e).slice(8,-1);return i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set"?Array.from(e):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?q(e,t):void 0}}function Xe(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ye(e){if(Array.isArray(e))return q(e)}function q(e,t){(t==null||t>e.length)&&(t=e.length);for(var i=0,a=Array(t);i<t;i++)a[i]=e[i];return a}var de={name:"GalleriaItem",hostName:"Galleria",extends:R,emits:["start-slideshow","stop-slideshow","update:activeIndex"],props:{circular:{type:Boolean,default:!1},activeIndex:{type:Number,default:0},value:{type:Array,default:null},showItemNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},slideShowActive:{type:Boolean,default:!0},changeItemOnIndicatorHover:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!1},templates:{type:null,default:null},id:{type:String,default:null}},mounted:function(){this.autoPlay&&this.$emit("start-slideshow")},methods:{getIndicatorPTOptions:function(t){return{context:{highlighted:this.activeIndex===t}}},next:function(){var t=this.activeIndex+1,i=this.circular&&this.value.length-1===this.activeIndex?0:t;this.$emit("update:activeIndex",i)},prev:function(){var t=this.activeIndex!==0?this.activeIndex-1:0,i=this.circular&&this.activeIndex===0?this.value.length-1:t;this.$emit("update:activeIndex",i)},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},navBackward:function(t){this.stopSlideShow(),this.prev(),t&&t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow(),this.next(),t&&t.cancelable&&t.preventDefault()},onIndicatorClick:function(t){this.stopSlideShow(),this.$emit("update:activeIndex",t)},onIndicatorMouseEnter:function(t){this.changeItemOnIndicatorHover&&(this.stopSlideShow(),this.$emit("update:activeIndex",t))},onIndicatorKeyDown:function(t,i){switch(t.code){case"Enter":case"NumpadEnter":case"Space":this.stopSlideShow(),this.$emit("update:activeIndex",i),t.preventDefault();break;case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"Tab":this.onTabKey();break;case"ArrowDown":case"ArrowUp":case"PageUp":case"PageDown":t.preventDefault();break}},onRightKey:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,i+1===t.length?t.length-1:i+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,t.length-1)},onTabKey:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=t.findIndex(function(n){return ce(n,"data-p-active")===!0}),a=F(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]'),o=t.findIndex(function(n){return n===a.parentElement});t[o].children[0].tabIndex="-1",t[i].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),i=F(this.$refs.indicatorContent,'[data-pc-section="indicator"] > [tabindex="0"]');return t.findIndex(function(a){return a===i.parentElement})},changedFocusedIndicator:function(t,i){var a=$(S(this.$refs.indicatorContent,'[data-pc-section="indicator"]'));a[t].children[0].tabIndex="-1",a[i].children[0].tabIndex="0",a[i].children[0].focus()},isIndicatorItemActive:function(t){return this.activeIndex===t},ariaSlideNumber:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,t):void 0},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{activeItem:function(){return this.value[this.activeIndex]},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.activeIndex===0},isNavForwardDisabled:function(){return!this.circular&&this.activeIndex===this.value.length-1}},components:{ChevronLeftIcon:se,ChevronRightIcon:le},directives:{ripple:Z}},Je=["disabled"],Qe=["id","aria-label","aria-roledescription"],et=["disabled"],tt=["aria-label","aria-selected","aria-controls","onClick","onMouseenter","onKeydown","data-p-active"],it=["tabindex"];function at(e,t,i,a,o,n){var b=H("ripple");return s(),p("div",c({class:e.cx("itemsContainer")},e.ptm("itemsContainer")),[l("div",c({class:e.cx("items")},e.ptm("items")),[i.showItemNavigators?L((s(),p("button",c({key:0,type:"button",class:e.cx("prevButton"),onClick:t[0]||(t[0]=function(d){return n.navBackward(d)}),disabled:n.isNavBackwardDisabled},e.ptm("prevButton"),{"data-pc-group-section":"itemnavigator"}),[(s(),g(w(i.templates.previousitemicon||"ChevronLeftIcon"),c({class:e.cx("prevIcon")},e.ptm("prevIcon")),null,16,["class"]))],16,Je)),[[b]]):v("",!0),l("div",c({id:i.id+"_item_"+i.activeIndex,class:e.cx("item"),role:"group","aria-label":n.ariaSlideNumber(i.activeIndex+1),"aria-roledescription":n.ariaSlideLabel},e.ptm("item")),[i.templates.item?(s(),g(w(i.templates.item),{key:0,item:n.activeItem},null,8,["item"])):v("",!0)],16,Qe),i.showItemNavigators?L((s(),p("button",c({key:1,type:"button",class:e.cx("nextButton"),onClick:t[1]||(t[1]=function(d){return n.navForward(d)}),disabled:n.isNavForwardDisabled},e.ptm("nextButton"),{"data-pc-group-section":"itemnavigator"}),[(s(),g(w(i.templates.nextitemicon||"ChevronRightIcon"),c({class:e.cx("nextIcon")},e.ptm("nextIcon")),null,16,["class"]))],16,et)),[[b]]):v("",!0),i.templates.caption?(s(),p("div",c({key:2,class:e.cx("caption")},e.ptm("caption")),[i.templates.caption?(s(),g(w(i.templates.caption),{key:0,item:n.activeItem},null,8,["item"])):v("",!0)],16)):v("",!0)],16),i.showIndicators?(s(),p("ul",c({key:0,ref:"indicatorContent",class:e.cx("indicatorList")},e.ptm("indicatorList")),[(s(!0),p(_,null,X(i.value,function(d,r){return s(),p("li",c({key:"p-galleria-indicator-".concat(r),class:e.cx("indicator",{index:r}),"aria-label":n.ariaPageLabel(r+1),"aria-selected":i.activeIndex===r,"aria-controls":i.id+"_item_"+r,onClick:function(k){return n.onIndicatorClick(r)},onMouseenter:function(k){return n.onIndicatorMouseEnter(r)},onKeydown:function(k){return n.onIndicatorKeyDown(k,r)}},{ref_for:!0},e.ptm("indicator",n.getIndicatorPTOptions(r)),{"data-p-active":n.isIndicatorItemActive(r)}),[i.templates.indicator?v("",!0):(s(),p("button",c({key:0,type:"button",tabindex:i.activeIndex===r?"0":"-1",class:e.cx("indicatorButton")},{ref_for:!0},e.ptm("indicatorButton",n.getIndicatorPTOptions(r))),null,16,it)),i.templates.indicator?(s(),g(w(i.templates.indicator),{key:1,index:r,activeIndex:i.activeIndex,tabindex:i.activeIndex===r?"0":"-1"},null,8,["index","activeIndex","tabindex"])):v("",!0)],16,tt)}),128))],16)):v("",!0)],16)}de.render=at;function G(e){return lt(e)||ot(e)||rt(e)||nt()}function nt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function rt(e,t){if(e){if(typeof e=="string")return W(e,t);var i={}.toString.call(e).slice(8,-1);return i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set"?Array.from(e):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?W(e,t):void 0}}function ot(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function lt(e){if(Array.isArray(e))return W(e)}function W(e,t){(t==null||t>e.length)&&(t=e.length);for(var i=0,a=Array(t);i<t;i++)a[i]=e[i];return a}var he={name:"GalleriaThumbnails",hostName:"Galleria",extends:R,emits:["stop-slideshow","update:activeIndex"],props:{containerId:{type:String,default:null},value:{type:Array,default:null},numVisible:{type:Number,default:3},activeIndex:{type:Number,default:0},isVertical:{type:Boolean,default:!1},slideShowActive:{type:Boolean,default:!1},circular:{type:Boolean,default:!1},responsiveOptions:{type:Array,default:null},contentHeight:{type:String,default:"300px"},showThumbnailNavigators:{type:Boolean,default:!0},templates:{type:null,default:null},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null}},startPos:null,thumbnailsStyle:null,sortedResponsiveOptions:null,data:function(){return{d_numVisible:this.numVisible,d_oldNumVisible:this.numVisible,d_activeIndex:this.activeIndex,d_oldActiveItemIndex:this.activeIndex,totalShiftedItems:0,page:0}},watch:{numVisible:function(t,i){this.d_numVisible=t,this.d_oldNumVisible=i},activeIndex:function(t,i){this.d_activeIndex=t,this.d_oldActiveItemIndex=i}},mounted:function(){this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()},updated:function(){var t=this.totalShiftedItems;(this.d_oldNumVisible!==this.d_numVisible||this.d_oldActiveItemIndex!==this.d_activeIndex)&&(this.d_activeIndex<=this.getMedianItemIndex()?t=0:this.value.length-this.d_numVisible+this.getMedianItemIndex()<this.d_activeIndex?t=this.d_numVisible-this.value.length:this.value.length-this.d_numVisible<this.d_activeIndex&&this.d_numVisible%2===0?t=this.d_activeIndex*-1+this.getMedianItemIndex()+1:t=this.d_activeIndex*-1+this.getMedianItemIndex(),t!==this.totalShiftedItems&&(this.totalShiftedItems=t),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(t*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(t*(100/this.d_numVisible),"%, 0, 0)"),this.d_oldActiveItemIndex!==this.d_activeIndex&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&te(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.d_oldActiveItemIndex=this.d_activeIndex,this.d_oldNumVisible=this.d_numVisible)},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.thumbnailsStyle&&this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle)},methods:{step:function(t){var i=this.totalShiftedItems+t;t<0&&-1*i+this.d_numVisible>this.value.length-1?i=this.d_numVisible-this.value.length:t>0&&i>0&&(i=0),this.circular&&(t<0&&this.value.length-1===this.d_activeIndex?i=0:t>0&&this.d_activeIndex===0&&(i=this.d_numVisible-this.value.length)),this.$refs.itemsContainer&&(document.body.setAttribute("data-p-items-hidden","false"),!this.isUnstyled&&te(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transform=this.isVertical?"translate3d(0, ".concat(i*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(i*(100/this.d_numVisible),"%, 0, 0)"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=i},stopSlideShow:function(){this.slideShowActive&&this.stopSlideShow&&this.$emit("stop-slideshow")},getMedianItemIndex:function(){var t=Math.floor(this.d_numVisible/2);return this.d_numVisible%2?t:t-1},navBackward:function(t){this.stopSlideShow();var i=this.d_activeIndex!==0?this.d_activeIndex-1:0,a=i+this.totalShiftedItems;this.d_numVisible-a-1>this.getMedianItemIndex()&&(-1*this.totalShiftedItems!==0||this.circular)&&this.step(1);var o=this.circular&&this.d_activeIndex===0?this.value.length-1:i;this.$emit("update:activeIndex",o),t.cancelable&&t.preventDefault()},navForward:function(t){this.stopSlideShow();var i=this.d_activeIndex===this.value.length-1?this.value.length-1:this.d_activeIndex+1;i+this.totalShiftedItems>this.getMedianItemIndex()&&(-1*this.totalShiftedItems<this.getTotalPageNumber()-1||this.circular)&&this.step(-1);var a=this.circular&&this.value.length-1===this.d_activeIndex?0:i;this.$emit("update:activeIndex",a),t.cancelable&&t.preventDefault()},onItemClick:function(t){this.stopSlideShow();var i=t;if(i!==this.d_activeIndex){var a=i+this.totalShiftedItems,o=0;i<this.d_activeIndex?(o=this.d_numVisible-a-1-this.getMedianItemIndex(),o>0&&-1*this.totalShiftedItems!==0&&this.step(o)):(o=this.getMedianItemIndex()-a,o<0&&-1*this.totalShiftedItems<this.getTotalPageNumber()-1&&this.step(o)),this.$emit("update:activeIndex",i)}},onThumbnailKeydown:function(t,i){switch((t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.onItemClick(i),t.preventDefault()),t.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),t.preventDefault();break;case"End":this.onEndKey(),t.preventDefault();break;case"ArrowUp":case"ArrowDown":t.preventDefault();break;case"Tab":this.onTabKey();break}},onRightKey:function(){var t=S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,i+1===t.length?t.length-1:i+1)},onLeftKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,t-1<=0?0:t-1)},onHomeKey:function(){var t=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(t,0)},onEndKey:function(){var t=S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]'),i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,t.length-1)},onTabKey:function(){var t=G(S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),i=t.findIndex(function(n){return ce(n,"data-p-active")===!0}),a=F(this.$refs.itemsContainer,'[tabindex="0"]'),o=t.findIndex(function(n){return n===a.parentElement});t[o].children[0].tabIndex="-1",t[i].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var t=G(S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]')),i=F(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"] > [tabindex="0"]');return t.findIndex(function(a){return a===i.parentElement})},changedFocusedIndicator:function(t,i){var a=S(this.$refs.itemsContainer,'[data-pc-section="thumbnailitem"]');a[t].children[0].tabIndex="-1",a[i].children[0].tabIndex="0",a[i].children[0].focus()},onTransitionEnd:function(t){this.$refs.itemsContainer&&t.propertyName==="transform"&&(document.body.setAttribute("data-p-items-hidden","true"),!this.isUnstyled&&ue(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="")},onTouchStart:function(t){var i=t.changedTouches[0];this.startPos={x:i.pageX,y:i.pageY}},onTouchMove:function(t){t.cancelable&&t.preventDefault()},onTouchEnd:function(t){var i=t.changedTouches[0];this.isVertical?this.changePageOnTouch(t,i.pageY-this.startPos.y):this.changePageOnTouch(t,i.pageX-this.startPos.x)},changePageOnTouch:function(t,i){var a=10;Math.abs(i)<a||(i<0?this.navForward(t):this.navBackward(t))},getTotalPageNumber:function(){return this.value.length>this.d_numVisible?this.value.length-this.d_numVisible+1:0},createStyle:function(){if(!this.thumbnailsStyle){var t;this.thumbnailsStyle=document.createElement("style"),this.thumbnailsStyle.type="text/css",De(this.thumbnailsStyle,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.body.appendChild(this.thumbnailsStyle)}var i=`
                #`.concat(this.containerId,` [data-pc-section="thumbnailitem"] {
                    flex: 1 0 `).concat(100/this.d_numVisible,`%
                }
            `);if(this.responsiveOptions&&!this.isUnstyled){this.sortedResponsiveOptions=G(this.responsiveOptions);var a=Oe();this.sortedResponsiveOptions.sort(function(b,d){var r=b.breakpoint,h=d.breakpoint;return Le(r,h,-1,a)});for(var o=0;o<this.sortedResponsiveOptions.length;o++){var n=this.sortedResponsiveOptions[o];i+=`
                        @media screen and (max-width: `.concat(n.breakpoint,`) {
                            #`).concat(this.containerId,` .p-galleria-thumbnail-item {
                                flex: 1 0 `).concat(100/n.numVisible,`%
                            }
                        }
                    `)}}this.thumbnailsStyle.innerHTML=i},calculatePosition:function(){if(this.$refs.itemsContainer&&this.sortedResponsiveOptions){for(var t=window.innerWidth,i={numVisible:this.numVisible},a=0;a<this.sortedResponsiveOptions.length;a++){var o=this.sortedResponsiveOptions[a];parseInt(o.breakpoint,10)>=t&&(i=o)}this.d_numVisible!==i.numVisible&&(this.d_numVisible=i.numVisible)}},bindDocumentListeners:function(){var t=this;this.documentResizeListener||(this.documentResizeListener=function(){t.calculatePosition()},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)},firstItemAciveIndex:function(){return this.totalShiftedItems*-1},lastItemActiveIndex:function(){return this.firstItemAciveIndex()+this.d_numVisible-1},isItemActive:function(t){return this.firstItemAciveIndex()<=t&&this.lastItemActiveIndex()>=t},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},computed:{ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0},isNavBackwardDisabled:function(){return!this.circular&&this.d_activeIndex===0||this.value.length<=this.d_numVisible},isNavForwardDisabled:function(){return!this.circular&&this.d_activeIndex===this.value.length-1||this.value.length<=this.d_numVisible}},components:{ChevronLeftIcon:se,ChevronRightIcon:le,ChevronUpIcon:ke,ChevronDownIcon:xe},directives:{ripple:Z}};function V(e){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(e)}function ie(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),i.push.apply(i,a)}return i}function j(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?ie(Object(i),!0).forEach(function(a){st(e,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):ie(Object(i)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(i,a))})}return e}function st(e,t,i){return(t=ut(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function ut(e){var t=ct(e,"string");return V(t)=="symbol"?t:t+""}function ct(e,t){if(V(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var a=i.call(e,t);if(V(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var dt=["disabled","aria-label"],ht=["data-p-active","aria-selected","aria-controls","onKeydown","data-p-galleria-thumbnail-item-current","data-p-galleria-thumbnail-item-active","data-p-galleria-thumbnail-item-start","data-p-galleria-thumbnail-item-end"],mt=["tabindex","aria-label","aria-current","onClick"],pt=["disabled","aria-label"];function vt(e,t,i,a,o,n){var b=H("ripple");return s(),p("div",c({class:e.cx("thumbnails")},e.ptm("thumbnails")),[l("div",c({class:e.cx("thumbnailContent")},e.ptm("thumbnailContent")),[i.showThumbnailNavigators?L((s(),p("button",c({key:0,class:e.cx("thumbnailPrevButton"),disabled:n.isNavBackwardDisabled,type:"button","aria-label":n.ariaPrevButtonLabel,onClick:t[0]||(t[0]=function(d){return n.navBackward(d)})},j(j({},i.prevButtonProps),e.ptm("thumbnailPrevButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(s(),g(w(i.templates.previousthumbnailicon||(i.isVertical?"ChevronUpIcon":"ChevronLeftIcon")),c({class:e.cx("thumbnailPrevIcon")},e.ptm("thumbnailPrevIcon")),null,16,["class"]))],16,dt)),[[b]]):v("",!0),l("div",c({class:e.cx("thumbnailsViewport"),style:{height:i.isVertical?i.contentHeight:""}},e.ptm("thumbnailsViewport")),[l("div",c({ref:"itemsContainer",class:e.cx("thumbnailItems"),role:"tablist",onTransitionend:t[1]||(t[1]=function(d){return n.onTransitionEnd(d)}),onTouchstart:t[2]||(t[2]=function(d){return n.onTouchStart(d)}),onTouchmove:t[3]||(t[3]=function(d){return n.onTouchMove(d)}),onTouchend:t[4]||(t[4]=function(d){return n.onTouchEnd(d)})},e.ptm("thumbnailItems")),[(s(!0),p(_,null,X(i.value,function(d,r){return s(),p("div",c({key:"p-galleria-thumbnail-item-".concat(r),class:e.cx("thumbnailItem",{index:r,activeIndex:i.activeIndex}),role:"tab","data-p-active":i.activeIndex===r,"aria-selected":i.activeIndex===r,"aria-controls":i.containerId+"_item_"+r,onKeydown:function(k){return n.onThumbnailKeydown(k,r)}},{ref_for:!0},e.ptm("thumbnailItem"),{"data-p-galleria-thumbnail-item-current":i.activeIndex===r,"data-p-galleria-thumbnail-item-active":n.isItemActive(r),"data-p-galleria-thumbnail-item-start":n.firstItemAciveIndex()===r,"data-p-galleria-thumbnail-item-end":n.lastItemActiveIndex()===r}),[l("div",c({class:e.cx("thumbnail"),tabindex:i.activeIndex===r?"0":"-1","aria-label":n.ariaPageLabel(r+1),"aria-current":i.activeIndex===r?"page":void 0,onClick:function(k){return n.onItemClick(r)}},{ref_for:!0},e.ptm("thumbnail")),[i.templates.thumbnail?(s(),g(w(i.templates.thumbnail),{key:0,item:d},null,8,["item"])):v("",!0)],16,mt)],16,ht)}),128))],16)],16),i.showThumbnailNavigators?L((s(),p("button",c({key:1,class:e.cx("thumbnailNextButton"),disabled:n.isNavForwardDisabled,type:"button","aria-label":n.ariaNextButtonLabel,onClick:t[5]||(t[5]=function(d){return n.navForward(d)})},j(j({},i.nextButtonProps),e.ptm("thumbnailNextButton")),{"data-pc-group-section":"thumbnailnavigator"}),[(s(),g(w(i.templates.nextthumbnailicon||(i.isVertical?"ChevronDownIcon":"ChevronRightIcon")),c({class:e.cx("thumbnailNextIcon")},e.ptm("thumbnailNextIcon")),null,16,["class"]))],16,pt)),[[b]]):v("",!0)],16)],16)}he.render=vt;function N(e){"@babel/helpers - typeof";return N=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},N(e)}function ae(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),i.push.apply(i,a)}return i}function ne(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?ae(Object(i),!0).forEach(function(a){bt(e,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):ae(Object(i)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(i,a))})}return e}function bt(e,t,i){return(t=ft(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function ft(e){var t=gt(e,"string");return N(t)=="symbol"?t:t+""}function gt(e,t){if(N(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var a=i.call(e,t);if(N(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var me={name:"GalleriaContent",hostName:"Galleria",extends:R,inheritAttrs:!1,interval:null,emits:["activeitem-change","mask-hide"],data:function(){return{activeIndex:this.$attrs.activeIndex,numVisible:this.$attrs.numVisible,slideShowActive:!1}},watch:{"$attrs.value":function(t){t&&t.length<this.numVisible&&(this.numVisible=t.length)},"$attrs.activeIndex":function(t){this.activeIndex=t},"$attrs.numVisible":function(t){this.numVisible=t},"$attrs.autoPlay":function(t){t?this.startSlideShow():this.stopSlideShow()}},updated:function(){this.$emit("activeitem-change",this.activeIndex)},beforeUnmount:function(){this.slideShowActive&&this.stopSlideShow()},methods:{getPTOptions:function(t){return this.ptm(t,{props:ne(ne({},this.$attrs),{},{pt:this.pt,unstyled:this.unstyled})})},isAutoPlayActive:function(){return this.slideShowActive},startSlideShow:function(){var t=this;this.interval=setInterval(function(){var i=t.$attrs.circular&&t.$attrs.value.length-1===t.activeIndex?0:t.activeIndex+1;t.activeIndex=i},this.$attrs.transitionInterval),this.slideShowActive=!0},stopSlideShow:function(){this.interval&&clearInterval(this.interval),this.slideShowActive=!1},getPositionClass:function(t,i){var a=["top","left","bottom","right"],o=a.find(function(n){return n===i});return o?"".concat(t,"-").concat(o):""},isVertical:function(){return this.$attrs.thumbnailsPosition==="left"||this.$attrs.thumbnailsPosition==="right"}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},components:{GalleriaItem:de,GalleriaThumbnails:he,TimesIcon:Se},directives:{ripple:Z}};function K(e){"@babel/helpers - typeof";return K=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},K(e)}function re(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),i.push.apply(i,a)}return i}function oe(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?re(Object(i),!0).forEach(function(a){yt(e,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):re(Object(i)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(i,a))})}return e}function yt(e,t,i){return(t=It(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function It(e){var t=wt(e,"string");return K(t)=="symbol"?t:t+""}function wt(e,t){if(K(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var a=i.call(e,t);if(K(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var St=["id","aria-label","aria-roledescription"],xt=["aria-label"],kt=["aria-live"];function Pt(e,t,i,a,o,n){var b=C("GalleriaItem"),d=C("GalleriaThumbnails"),r=H("ripple");return e.$attrs.value&&e.$attrs.value.length>0?(s(),p("div",c({key:0,id:e.$id,role:"region",class:[e.cx("root"),e.$attrs.containerClass],style:e.$attrs.containerStyle,"aria-label":e.$attrs.ariaLabel,"aria-roledescription":e.$attrs.ariaRoledescription},oe(oe({},e.$attrs.containerProps),n.getPTOptions("root"))),[e.$attrs.fullScreen?L((s(),p("button",c({key:0,autofocus:"",type:"button",class:e.cx("closeButton"),"aria-label":n.closeAriaLabel,onClick:t[0]||(t[0]=function(h){return e.$emit("mask-hide")})},n.getPTOptions("closeButton")),[(s(),g(w(e.$attrs.templates.closeicon||"TimesIcon"),c({class:e.cx("closeIcon")},n.getPTOptions("closeIcon")),null,16,["class"]))],16,xt)),[[r]]):v("",!0),e.$attrs.templates&&e.$attrs.templates.header?(s(),p("div",c({key:1,class:e.cx("header")},n.getPTOptions("header")),[(s(),g(w(e.$attrs.templates.header)))],16)):v("",!0),l("div",c({class:e.cx("content"),"aria-live":e.$attrs.autoPlay?"polite":"off"},n.getPTOptions("content")),[x(b,{id:e.$id,activeIndex:o.activeIndex,"onUpdate:activeIndex":t[1]||(t[1]=function(h){return o.activeIndex=h}),slideShowActive:o.slideShowActive,"onUpdate:slideShowActive":t[2]||(t[2]=function(h){return o.slideShowActive=h}),value:e.$attrs.value,circular:e.$attrs.circular,templates:e.$attrs.templates,showIndicators:e.$attrs.showIndicators,changeItemOnIndicatorHover:e.$attrs.changeItemOnIndicatorHover,showItemNavigators:e.$attrs.showItemNavigators,autoPlay:e.$attrs.autoPlay,onStartSlideshow:n.startSlideShow,onStopSlideshow:n.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["id","activeIndex","slideShowActive","value","circular","templates","showIndicators","changeItemOnIndicatorHover","showItemNavigators","autoPlay","onStartSlideshow","onStopSlideshow","pt","unstyled"]),e.$attrs.showThumbnails?(s(),g(d,{key:0,activeIndex:o.activeIndex,"onUpdate:activeIndex":t[3]||(t[3]=function(h){return o.activeIndex=h}),slideShowActive:o.slideShowActive,"onUpdate:slideShowActive":t[4]||(t[4]=function(h){return o.slideShowActive=h}),containerId:e.$id,value:e.$attrs.value,templates:e.$attrs.templates,numVisible:o.numVisible,responsiveOptions:e.$attrs.responsiveOptions,circular:e.$attrs.circular,isVertical:n.isVertical(),contentHeight:e.$attrs.verticalThumbnailViewPortHeight,showThumbnailNavigators:e.$attrs.showThumbnailNavigators,prevButtonProps:e.$attrs.prevButtonProps,nextButtonProps:e.$attrs.nextButtonProps,onStopSlideshow:n.stopSlideShow,pt:e.pt,unstyled:e.unstyled},null,8,["activeIndex","slideShowActive","containerId","value","templates","numVisible","responsiveOptions","circular","isVertical","contentHeight","showThumbnailNavigators","prevButtonProps","nextButtonProps","onStopSlideshow","pt","unstyled"])):v("",!0)],16,kt),e.$attrs.templates&&e.$attrs.templates.footer?(s(),p("div",c({key:2,class:e.cx("footer")},n.getPTOptions("footer")),[(s(),g(w(e.$attrs.templates.footer)))],16)):v("",!0)],16,St)):v("",!0)}me.render=Pt;var pe={name:"Galleria",extends:qe,inheritAttrs:!1,emits:["update:activeIndex","update:visible"],container:null,mask:null,documentKeydownListener:null,data:function(){return{containerVisible:this.visible,target:null}},updated:function(){this.fullScreen&&this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.fullScreen&&ee(),this.mask=null,this.container&&(U.clear(this.container),this.container=null)},methods:{onBeforeEnter:function(t){U.set("modal",t,this.baseZIndex||this.$primevue.config.zIndex.modal)},onEnter:function(t){this.target=document.activeElement,this.mask.style.zIndex=String(parseInt(t.style.zIndex,10)-1),Ae(),this.focus(),this.bindGlobalListeners()},onBeforeLeave:function(){!this.isUnstyled&&ue(this.mask,"p-overlay-mask-leave")},onLeave:function(){Pe(this.target),this.target=null},onAfterLeave:function(t){U.clear(t),this.containerVisible=!1,ee(),this.unbindGlobalListeners()},onActiveItemChange:function(t){this.activeIndex!==t&&this.$emit("update:activeIndex",t)},maskHide:function(){this.$emit("update:visible",!1)},containerRef:function(t){this.container=t},maskRef:function(t){this.mask=t},onKeyDown:function(t){t.code==="Escape"&&this.maskHide()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindGlobalListeners:function(){this.fullScreen&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.fullScreen&&this.unbindDocumentKeyDownListener()},focus:function(){var t=this.container.$el.querySelector("[autofocus]");t&&t.focus()}},components:{GalleriaContent:me,Portal:we},directives:{focustrap:Ie}},At=["aria-modal"];function Dt(e,t,i,a,o,n){var b=C("GalleriaContent"),d=C("Portal"),r=H("focustrap");return e.fullScreen?(s(),g(d,{key:0},{default:z(function(){return[o.containerVisible?(s(),p("div",c({key:0,ref:n.maskRef,class:[e.cx("mask"),e.maskClass],role:"dialog","aria-modal":e.fullScreen?"true":void 0},e.ptm("mask")),[x(Ce,c({name:"p-galleria",onBeforeEnter:n.onBeforeEnter,onEnter:n.onEnter,onBeforeLeave:n.onBeforeLeave,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave,appear:""},e.ptm("transition")),{default:z(function(){return[e.visible?L((s(),g(b,c({key:0,ref:n.containerRef,onMaskHide:n.maskHide,templates:e.$slots,onActiveitemChange:n.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["onMaskHide","templates","onActiveitemChange","pt","unstyled"])),[[r]]):v("",!0)]}),_:1},16,["onBeforeEnter","onEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,At)):v("",!0)]}),_:1})):(s(),g(b,c({key:1,templates:e.$slots,onActiveitemChange:n.onActiveItemChange,pt:e.pt,unstyled:e.unstyled},e.$props),null,16,["templates","onActiveitemChange","pt","unstyled"]))}pe.render=Dt;var Ot={name:"Dropdown",extends:Be,mounted:function(){console.warn("Deprecated since v4. Use Select component instead.")}};const Lt={key:0,class:"loading-container"},Ct={key:1,class:"detail-container"},Bt={class:"info-column"},Tt={class:"header"},$t={class:"title"},Vt={class:"meta-info"},Nt={class:"location"},Kt=["src","alt"],Et={class:"section"},jt={class:"section"},Ft={class:"section"},_t={class:"booking-column"},zt={class:"booking-card"},Rt={class:"price"},Ht={class:"price-unit"},Mt={class:"booking-form"},Ut={class:"form-group"},Gt={class:"form-group"},qt={class:"form-group"},Wt={class:"total-price"},Zt={key:2,class:"not-found-container"},Xt={__name:"experience-detail-view.page",props:{id:{type:String,required:!0}},setup(e){const t=e,i=new Ee,a=P(null),o=P(!0),n=P(null),b=P(1),d=P(null),{t:r}=$e(),h=Ve(),k=new He;P([]);const B=P([]),M=P([]),ve=Ne(()=>a.value?a.value.price*b.value:0),Y=u=>{switch(u?u.toLowerCase():""){case"weekdays":B.value=[0,6];break;case"weekends":B.value=[1,2,3,4,5];break;case"daily":B.value=[];break;default:console.warn(`Frecuencia de experiencia desconocida o no mapeada: "${u}". Se deshabilitarán todos los días por precaución.`),B.value=[0,1,2,3,4,5,6];break}};Ke(async()=>{try{const u=await i.getExperienceById(Number(t.id));u.data&&(a.value=je.toEntityFromResource(u.data),console.log("Frecuencias de la experiencia:",a.value.frequencies),a.value.schedule&&Array.isArray(a.value.schedule)?M.value=a.value.schedule.map(f=>f.time):(M.value=[],console.warn("La propiedad 'schedule' de la experiencia no es un array o es nula.")),a.value.frequencies?Y(a.value.frequencies):(console.warn("La propiedad 'frequencies' de la experiencia es nula o vacía. Deshabilitando todos los días por precaución."),Y("none")))}catch(u){console.error(r("error.loadExperienceError"),u),a.value=null}finally{o.value=!1}}),Fe(n,u=>{d.value=null});const be=async()=>{if(!n.value){h.add({severity:"warn",summary:r("common.warning"),detail:r("error.selectDateAlert"),life:3e3});return}if(!d.value){h.add({severity:"warn",summary:r("common.warning"),detail:r("error.selectScheduleAlert"),life:3e3});return}const u=n.value.getDay(),f=a.value.frequencies.toLowerCase();let A=!1;switch(f){case"weekdays":A=u>=1&&u<=5;break;case"weekends":A=u===0||u===6;break;case"daily":A=!0;break;default:A=!1;break}if(!A){h.add({severity:"error",summary:r("common.error"),detail:r("error.invalidDateFrequencyAlert"),life:5e3});return}if(!localStorage.getItem("token")){h.add({severity:"error",summary:r("common.error"),detail:r("error.userNotLoggedIn"),life:5e3}),console.error("No authentication token found. User must be logged in to make a booking.");return}const y={experienceId:a.value.id,bookingDate:n.value.toISOString(),numberOfPeople:b.value,time:d.value};console.log("Booking data sent:",y);try{const I=await k.createBooking(y);I.status>=200&&I.status<300?h.add({severity:"success",summary:r("common.success"),detail:r("booking.success"),life:3e3}):(console.error("Error en la respuesta no-2xx del backend:",I.status,I.data),h.add({severity:"error",summary:r("common.error"),detail:r("error.networkOrServerIssue"),life:7e3}))}catch(I){if(h.add({severity:"error",summary:r("common.error"),detail:r("error.networkOrServerIssue"),life:7e3}),console.error("Error de red o del servidor al crear reserva:",I),I.response&&I.response.data){console.error("Detalles de error del backend (catch):",I.response.data);const O=I.response.data;let E=r("error.bookingFailedDefault");if(O.message)E=O.message;else if(O.errors){const fe=Object.values(O.errors).flat().map(Q=>Q.message||Q);E=r("error.validationFailed")+": "+fe.join("; ")}else O.detail&&(E=O.detail);h.add({severity:"error",summary:r("common.error"),detail:E,life:7e3})}}};return(u,f)=>{const A=C("Toast"),J=C("router-link");return s(),p(_,null,[x(A),f[5]||(f[5]=D()),o.value?(s(),p("div",Lt,[l("p",null,m(u.$t("experienceDetail.loadingDetails")),1)])):a.value?(s(),p("div",Ct,[l("div",Bt,[l("div",Tt,[l("h1",$t,m(a.value.title),1),l("div",Vt,[l("span",Nt,[f[3]||(f[3]=l("i",{class:"pi pi-map-marker"},null,-1)),D(" "+m(a.value.location),1)])])]),x(T(pe),{value:a.value.experienceImages,numVisible:5,containerStyle:"max-width: 100%",showThumbnails:!1,showIndicators:!0,circular:!0,autoPlay:!0,transitionInterval:3e3},{item:z(y=>[l("img",{src:y.item.url,alt:a.value.title,style:{width:"100%",display:"block","border-radius":"12px"}},null,8,Kt)]),_:1},8,["value"]),l("div",Et,[l("h2",null,m(u.$t("experienceDetail.descriptionTitle")),1),l("p",null,m(a.value.description),1)]),l("div",jt,[l("h2",null,m(u.$t("experienceDetail.includesTitle")),1),l("ul",null,[(s(!0),p(_,null,X(a.value.includes,(y,I)=>(s(),p("li",{key:I},[f[4]||(f[4]=l("i",{class:"pi pi-check-circle",style:{color:"#2c8a8a"}},null,-1)),D(" "+m(y.description),1)]))),128))])]),l("div",Ft,[l("h2",null,m(u.$t("experienceDetail.schedulesTitle")),1),l("p",null,[l("strong",null,m(u.$t("experienceDetail.frequencyLabel")),1),D(" "+m(a.value.frequencies),1)]),l("p",null,[l("strong",null,m(u.$t("experienceDetail.availableSchedulesLabel")),1),D(" "+m(a.value.schedule.map(y=>y.time).join(", ")),1)])])]),l("div",_t,[l("div",zt,[l("h3",Rt,[D(m(u.$t("experienceDetail.priceCurrency"))+" "+m(a.value.price)+" ",1),l("span",Ht,m(u.$t("experienceDetail.priceUnit")),1)]),l("div",Mt,[l("div",Ut,[l("label",null,m(u.$t("experienceDetail.dateLabel")),1),x(T(_e),{modelValue:n.value,"onUpdate:modelValue":f[0]||(f[0]=y=>n.value=y),placeholder:u.$t("experienceDetail.datePlaceholder"),dateFormat:"dd/mm/yy",class:"w-full",disabledDays:B.value,minDate:new Date,selectionMode:"single",touchUI:""},null,8,["modelValue","placeholder","disabledDays","minDate"])]),l("div",Gt,[l("label",null,m(u.$t("experienceDetail.scheduleLabel")),1),x(T(Ot),{modelValue:d.value,"onUpdate:modelValue":f[1]||(f[1]=y=>d.value=y),options:M.value,placeholder:u.$t("experienceDetail.schedulePlaceholder"),class:"w-full"},null,8,["modelValue","options","placeholder"])]),l("div",qt,[l("label",null,m(u.$t("experienceDetail.numberOfPeopleLabel")),1),x(T(ze),{modelValue:b.value,"onUpdate:modelValue":f[2]||(f[2]=y=>b.value=y),mode:"decimal",showButtons:"",min:1,max:10,class:"w-full"},null,8,["modelValue"])])]),l("div",Wt,[l("span",null,m(u.$t("experienceDetail.totalLabel")),1),l("span",null,m(u.$t("experienceDetail.priceCurrency"))+" "+m(ve.value.toFixed(2)),1)]),x(T(Re),{label:u.$t("experienceDetail.bookNowButton"),class:"w-full booking-button",onClick:be},null,8,["label"])])])])):(s(),p("div",Zt,[l("h2",null,m(u.$t("experienceDetail.notFoundTitle")),1),l("p",null,m(u.$t("experienceDetail.notFoundMessage")),1),x(J,{to:"/"},{default:z(()=>[D(m(u.$t("experienceDetail.backToHomeButton")),1)]),_:1})]))],64)}}},Jt=Te(Xt,[["__scopeId","data-v-70626c21"]]);export{Jt as default};
