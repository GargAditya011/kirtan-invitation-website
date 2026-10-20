# Shyam Event Website v3 — multi-page edition

## क्या बदला है
- Home page पर केवल event title, तारीख/समय और मुख्य CTA है।
- हर navigation tab एक अलग HTML page खोलता है।
- नामों की सूचियाँ editable text entries हैं, invitation-page photos नहीं।
- विज्ञापन का अलग पेज, मायरा video page, वैष्णवी गुप्ता section और contact page।
- Palace / elephant / horse art के लिए स्पष्ट image paths नीचे दिए हैं।

## Windows पर चलाएँ
1. ZIP extract करें।
2. VS Code → File → Open Folder → `shyam-event-website-v3`।
3. `index.html` पर right click → Open with Live Server (अगर extension installed है)।

## Video जोड़ें
Video को `assets/mayra-show.mp4` नाम दें। `mayra.html` में video player पहले से है।

## Vaishnavi Gupta की portrait जोड़ें
अपनी photo `assets/vaishnavi-gupta.jpg` नाम से रखें। `mayra.html` में `portrait-placeholder` div को इस तरह बदलें:
`<img class="portrait-photo" src="assets/vaishnavi-gupta.jpg" alt="वैष्णवी गुप्ता">`
फिर `styles.css` में `.portrait-photo{width:100%;height:160px;object-fit:cover}` जोड़ें।

## Palace / elephant / horse images
- महल की background image: `assets/palace-background.jpg`
- हाथी की transparent PNG: `assets/rajasthani-elephant.png`
- घोड़े की transparent PNG: `assets/rajasthani-horse.png`

महल की फोटो `assets/palace-background.jpg` नाम से रखें तो home hero background में अपने-आप उपयोग होगी। Elephant/horse PNG को hero में जोड़ने के लिए `index.html` के `home-hero` section के अंदर `hero-content` के बाद यह डालें:
`<img class="royal-animal elephant" src="assets/rajasthani-elephant.png" alt="" aria-hidden="true">`
`<img class="royal-animal horse" src="assets/rajasthani-horse.png" alt="" aria-hidden="true">`
फिर `styles.css` के अंत में जोड़ें:
`.royal-animal{position:absolute;z-index:1;bottom:18px;width:clamp(70px,12vw,160px);max-height:180px;object-fit:contain;opacity:.85;pointer-events:none}.elephant{left:4%}.horse{right:4%}`
PNG transparent background वाली रखें ताकि design natural लगे। Image filenames exact होने चाहिए।

## नाम कैसे भरें
`arpankarta.html`, `invitees.html`, `supporters.html`, `ratna.html` में `[यहाँ कार्ड से नाम 1 लिखें]` जैसे editable placeholders हैं। Original card के नामों की image OCR/छोटे text से spelling पूरी तरह विश्वसनीय नहीं थी; इसलिए नाम invent नहीं किए गए। हर placeholder को सही नाम से replace करें और ज़रूरत हो तो `<li>...</li>` line copy करके rows बढ़ाएँ।

## "गीता गुटपुट फार्ट्स"
यह phrase स्पष्ट नहीं हो पाया है। कृपया सही spelling या card के उस हिस्से का crop दें ताकि इसे सही नाम/section के रूप में जोड़ सकें।

## नोट
Website files/paths बनाए गए हैं; browser/device testing, video playback (video अभी supplied नहीं) और exact venue map pin की पुष्टि बाकी है।
