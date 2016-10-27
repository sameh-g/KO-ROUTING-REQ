!function(s){"function"==typeof require&&"object"==typeof exports&&"object"==typeof module?s(require("knockout"),exports):"function"==typeof define&&define.amd?define(["knockout","exports"],s):s(ko,ko.postbox={})}(function(s,i,e){var t,o,n={},b=1;i.subscriptions=n,s.subscribable.call(i),i.topicCache={},i.serializer=s.toJSON,i.publish=function(s,e){s&&(i.topicCache[s]={value:e,serialized:i.serializer(e)},i.notifySubscribers(e,s))},o=i.subscribe,i.subscribe=function(s,t,u,c){var r,l,a;if(s)return"boolean"==typeof u&&(c=u,u=e),r=o.call(i,t,u,s),r.subId=++b,n[b]=r,c&&(l=i.topicCache[s],l!==e&&t.call(u,l.value)),a=r.dispose,r.dispose=function(){delete n[r.subId],a.call(r)},r},i.reset=function(){var s;for(var e in n)n.hasOwnProperty(e)&&(s=n[e],s&&"function"==typeof s.dispose&&s.dispose());i.topicCache={}},i.defaultComparer=function(s,e){return e&&i.serializer(s)===e.serialized},s.subscribable.fn.publishOn=function(s,e,o){var u,c,r;return s&&("function"==typeof e?o=e:u=e,o=o||i.defaultComparer,t.call(this,s,"publishOn"),c=this.subscribe(function(e){o.call(this,e,i.topicCache[s])||i.publish(s,e)},this),c.id=++b,n[b]=c,r=c.dispose,c.dispose=function(){delete this.postboxSubs[s].publishOn,delete n[c.id],r.call(c)}.bind(this),this.postboxSubs[s].publishOn=c,u||i.publish(s,this())),this},t=function(s,i){var e=this.postboxSubs=this.postboxSubs||{};e[s]=e[s]||{},e[s][i]&&e[s][i].dispose()},s.subscribable.fn.stopPublishingOn=function(s){return t.call(this,s,"publishOn"),this},s.subscribable.fn.subscribeTo=function(o,n,b){var u,c,r,l,a,p=this;return"function"==typeof n?b=n:u=n,o&&s.isWriteableObservable(this)&&(t.call(this,o,"subscribeTo"),r=function(s){p(b?b.call(p,s):s)},l=i.subscribe(o,r),this.postboxSubs[o].subscribeTo=l,a=l.dispose,l.dispose=function(){delete this.postboxSubs[o].subscribeTo,a.call(l)}.bind(this),u&&(c=i.topicCache[o],c!==e&&r(c.value))),this},s.subscribable.fn.unsubscribeFrom=function(s){return t.call(this,s,"subscribeTo"),this},s.subscribable.fn.syncWith=function(s,i,e,t){return this.subscribeTo(s,i).publishOn(s,e,t),this},s.postbox=i});