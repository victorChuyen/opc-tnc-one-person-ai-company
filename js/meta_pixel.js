/**
 * OPC-TNC — Meta Pixel & Server-Side Conversions API (CAPI) Tracker Module
 * Author: Co-Founder LUCKY & Chairman Victor Chuyen
 * Supports Meta Standard Events: PageView, ViewContent, Lead, InitiateCheckout, Purchase
 */

(function (window, document) {
    'use strict';

    // Default Meta Pixel ID (Can be overridden via window.META_PIXEL_ID)
    const DEFAULT_PIXEL_ID = window.META_PIXEL_ID || '1082547193645028'; // OPC-TNC Live Pixel ID

    // Initialize Meta Pixel Base Snippet if not present
    if (!window.fbq) {
        let n = (window.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        });
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        let t = document.createElement('script');
        t.async = true;
        t.src = 'https://connect.facebook.net/en_US/fbevents.js';
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(t, s);
    }

    if (DEFAULT_PIXEL_ID) {
        window.fbq('init', DEFAULT_PIXEL_ID);
        window.fbq('track', 'PageView');
    }

    // OPC Meta Tracker Global Object
    window.OPCMetaTracker = {
        pixelId: DEFAULT_PIXEL_ID,

        // Generate unique Event ID for deduplication between Pixel & CAPI
        generateEventId: function (prefix = 'EVT') {
            return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
        },

        // Client-side Event Trigger
        track: function (eventName, params = {}, eventId = null) {
            const eid = eventId || this.generateEventId(eventName.toUpperCase());
            const trackParams = { ...params, eventID: eid };

            if (window.fbq) {
                window.fbq('track', eventName, params, { eventID: eid });
                console.log(`[META PIXEL TRACK] ${eventName}`, trackParams);
            }
            return eid;
        },

        // Send Server-Side CAPI Event via local proxy
        sendCapi: async function (eventName, userData = {}, customData = {}, eventId = null) {
            const eid = eventId || this.generateEventId(eventName.toUpperCase());
            try {
                const response = await fetch('/api/meta/capi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event_name: eventName,
                        event_id: eid,
                        event_source_url: window.location.href,
                        user_data: userData,
                        custom_data: customData,
                        timestamp: Math.floor(Date.now() / 1000)
                    })
                });
                const result = await response.json();
                console.log(`[META CAPI SENT] ${eventName}`, result);
                return result;
            } catch (e) {
                console.warn(`[META CAPI ERROR] ${eventName}`, e.message);
            }
        },

        // Dual-Layer Track (Fires both Pixel & CAPI simultaneously for 100% data recovery)
        trackDual: function (eventName, userData = {}, customData = {}) {
            const eventId = this.generateEventId(eventName.toUpperCase());
            this.track(eventName, customData, eventId);
            this.sendCapi(eventName, userData, customData, eventId);
            return eventId;
        },

        // Helper Methods for Specific Funnel Steps
        trackViewContent: function (contentName, category = 'VSL_Landing') {
            return this.track('ViewContent', {
                content_name: contentName,
                content_category: category,
                value: 0,
                currency: 'VND'
            });
        },

        trackLead: function (userData = {}) {
            return this.trackDual('Lead', userData, {
                content_name: 'OPC_Source_Code_Package_0VND',
                value: 0,
                currency: 'VND'
            });
        },

        trackInitiateCheckout: function (pkgName, amount = 500000) {
            return this.track('InitiateCheckout', {
                content_name: pkgName || 'OPC_VIP_Coaching',
                value: amount,
                currency: 'VND'
            });
        },

        trackPurchase: function (userData = {}, amount = 500000, txId = '') {
            return this.trackDual('Purchase', userData, {
                content_name: 'OPC_VIP_Package_Access',
                value: amount,
                currency: 'VND',
                transaction_id: txId || `TX-${Date.now()}`
            });
        }
    };

    console.log('✅ OPC-TNC Meta Pixel & CAPI Tracker Ready!');
})(window, document);
