
(() => {
    'use strict';

    // MOBILE MENU
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('siteNav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }

    // GENERAL WEBSITE SHARE BUTTON
    const shareButton = document.getElementById('shareButton');

    if (shareButton) {
        shareButton.addEventListener('click', () => {
            const message = [
                '॥ जय श्री श्याम ॥',
                'श्री खाटू श्याम प्रभु के 13वें जन्मोत्सव पर नानी बाई का मायरा एवं नरसी का भात।',
                'दिनांक: 14 नवम्बर 2026, शनिवार',
                'समय: रात्रि 7 बजे से प्रभु इच्छा तक',
                'स्थान: दिगम्बर जैन कॉलेज, बड़ौत (बागपत)',
                'सादर आमंत्रित — श्री खाटू श्याम सेवा समिति, बड़ौत।'
            ].join('\n');

            window.open(
                'https://wa.me/?text=' + encodeURIComponent(message),
                '_blank',
                'noopener,noreferrer'
            );
        });
    }

    // COUNTDOWN
    const eventDate =
        new Date('2026-11-14T19:00:00+05:30').getTime();

    function updateCountdown() {
        const ids = ['days', 'hours', 'minutes', 'seconds'];
        const elements = ids.map(id => document.getElementById(id));

        if (elements.some(el => !el)) return;

        const distance = eventDate - Date.now();
        const caption = document.getElementById('countdownCaption');

        if (distance <= 0) {
            elements.forEach(el => el.textContent = '00');

            if (caption) {
                caption.textContent =
                    '॥ जय श्री श्याम ॥ उत्सव आरम्भ हो चुका है';
            }

            clearInterval(countdownTimer);
            return;
        }

        elements[0].textContent =
            String(Math.floor(distance / 86400000)).padStart(2, '0');

        elements[1].textContent =
            String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');

        elements[2].textContent =
            String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');

        elements[3].textContent =
            String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
    }

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    // PERSONAL INVITATION
    document.addEventListener('DOMContentLoaded', () => {
        const sender = document.getElementById('senderName');
        const receiver = document.getElementById('receiverName');
        const generateBtn = document.getElementById('generateInvite');
        const preview = document.getElementById('invitePreview');
        const previewHeading = document.getElementById('previewHeading');
        const previewSender = document.getElementById('previewSender');
        const previewReceiver = document.getElementById('previewReceiver');
        const shareBtn = document.getElementById('shareInvite');
        const copyBtn = document.getElementById('copyInvite');

        // READ NAMES FROM THE INVITATION LINK
        const params = new URLSearchParams(window.location.search);
        const linkedSender = (params.get('from') || '').trim().slice(0, 70);
        const linkedReceiver = (params.get('to') || '').trim().slice(0, 100);

        function showPersonalWelcome(from, to) {
            if (!from && !to) return;

            const hero = document.querySelector('.hero-content');
            const mainHeading = hero?.querySelector('h1');

            if (!hero || !mainHeading) return;

            let welcome = document.getElementById('personalWelcome');

            if (!welcome) {
                welcome = document.createElement('div');
                welcome.id = 'personalWelcome';
                welcome.style.cssText =
                    'margin:12px auto 18px;text-align:center;max-width:800px;';

                hero.insertBefore(welcome, mainHeading);
            }

            welcome.replaceChildren();

            const heading = document.createElement('h2');
            heading.textContent = to
                ? `आदरणीय ${to} एवं समस्त परिवार`
                : 'आप सपरिवार सादर आमंत्रित हैं';

            heading.style.cssText =
                'font-size:clamp(22px,4vw,34px);line-height:1.6;margin:8px 0;';

            const message = document.createElement('p');
            message.textContent = from
                ? `${from} एवं समस्त परिवार की ओर से सप्रेम निमंत्रण`
                : 'सप्रेम एवं सादर आमंत्रण';

            message.style.cssText =
                'font-size:clamp(15px,2.5vw,19px);line-height:1.8;margin:8px 0;';

            welcome.append(heading, message);

            // Keep the event title visible underneath.
            mainHeading.textContent = 'नानी बाई का मायरा';
        }

        // If a personalized link was opened, show the names on the homepage.
        showPersonalWelcome(linkedSender, linkedReceiver);

        if (!sender || !receiver || !generateBtn || !preview) return;

        // Prefill names if a personalized link is opened on this page.
        if (linkedSender) sender.value = linkedSender;
        if (linkedReceiver) receiver.value = linkedReceiver;

        function makeInvitation() {
            const senderName = sender.value.trim();
            const receiverName = receiver.value.trim();

            if (!senderName) {
                alert('भाई, पहले अपना शुभ नाम लिखो!');
                sender.focus();
                preview.hidden = true;
                return false;
            }

            if (previewHeading) {
                previewHeading.textContent =
                    `${senderName} एवं समस्त परिवार की ओर से`;
            }

            if (previewReceiver) {
                previewReceiver.textContent = receiverName
                    ? `आदरणीय ${receiverName} जी,`
                    : 'प्रिय श्याम प्रेमी परिवार,';
            }

            if (previewSender) {
                previewSender.textContent =
                    `सप्रेम निमंत्रक: ${senderName} एवं समस्त परिवार`;
            }

            preview.hidden = false;
            return true;
        }

        function getPersonalizedUrl() {
            // Keep the existing website URL, but replace old invitation names.
            const url = new URL(window.location.href);
            url.search = '';
            url.hash = '';
            url.searchParams.set('from', sender.value.trim());

            if (receiver.value.trim()) {
                url.searchParams.set('to', receiver.value.trim());
            }

            return url.href;
        }

        function getMessage() {
            const senderName = sender.value.trim();
            const receiverName = receiver.value.trim();
            const inviteUrl = getPersonalizedUrl();

            return [
                '॥ जय श्री श्याम ॥',
                '',
                '🙏 सादर एवं भावपूर्ण निमंत्रण 🙏',
                '',
                receiverName
                    ? `आदरणीय ${receiverName} जी,`
                    : 'प्रिय श्याम प्रेमी परिवार,',
                '',
                `${senderName} की ओर से सप्रेम निमंत्रण।`,
                '',
                'श्री खाटू श्याम प्रभु के 13वें जन्मोत्सव एवं',
                'नानी बाई का मायरा तथा नरसी का भात के पावन अवसर पर',
                'आप सपरिवार सादर आमंत्रित हैं।',
                '',
                '📅 दिनांक: 14 नवम्बर 2026, शनिवार',
                '🕖 समय: रात्रि 7 बजे से प्रभु इच्छा तक',
                '📍 स्थान: दिगम्बर जैन कॉलेज, बड़ौत (बागपत)',
                '',
                '🔗 आपका व्यक्तिगत निमंत्रण यहाँ देखें:',
                inviteUrl,
                '',
                'हारे का सहारा, बाबा श्याम हमारा।',
                '॥ जय श्री श्याम ॥'
            ].join('\n');
        }

        generateBtn.addEventListener('click', makeInvitation);

        
if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        if (!makeInvitation()) return;

        const senderName = sender.value.trim();
        const receiverName = receiver.value.trim();

        // Current live homepage URL with personal names
        const inviteUrl = new URL(window.location.href);
        inviteUrl.search = '';
        inviteUrl.hash = '';

        inviteUrl.searchParams.set('from', senderName);

        if (receiverName) {
            inviteUrl.searchParams.set('to', receiverName);
        }

        // Share ONLY the website link, not the invitation text
        const whatsappUrl =
            'https://wa.me/?text=' +
            encodeURIComponent(inviteUrl.href);

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
}


        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                if (!makeInvitation()) return;

                try {
                    await navigator.clipboard.writeText(getMessage());
                    alert('निमंत्रण और व्यक्तिगत लिंक कॉपी हो गया!');
                } catch (error) {
                    const field = document.createElement('textarea');
                    field.value = getMessage();
                    document.body.appendChild(field);
                    field.select();

                    const success = document.execCommand('copy');
                    field.remove();

                    alert(success
                        ? 'निमंत्रण और लिंक कॉपी हो गया!'
                        : 'कॉपी नहीं हुआ। दोबारा कोशिश करें।');
                }
            });
        }

        // Allow direct preview if names are already present in the URL.
        if (linkedSender) makeInvitation();
    });
})();
