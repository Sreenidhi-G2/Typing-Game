window.onload = function() {
    const input_field = document.querySelector('.wrapper .input-field');
    const typing_text = document.querySelector('.typing-text p');
    const time = document.querySelector('.time span b');
    const mistakes = document.querySelector('.mistake span');
    const wpm = document.querySelector('.wpm span');
    const cpm = document.querySelector('.cpm span');
    const try_again = document.querySelector('button');

    let timer;
    let maxtime = 30;
    let timeleft = maxtime;
    let charIndex = 0;
    let mistake = 0;
    let isTyping = false;

    function loadParagraph() {
        const paragraphs = ["the sun set behind the distant mountains casting a golden hue across the tranquil lake birds chirped softly in the trees as a gentle breeze rustled the leaves",
"lost in thought she wandered through the bustling marketplace the aroma of spices and freshly baked bread filling the air vendors called out their wares trying to catch her attention",
"in the quiet of the library he buried himself in books searching for answers to questions that had plagued him for months pages turned softly as he delved deeper into his research",
"on the edge of town an old barn stood weathered and worn a testament to years gone by shadows danced on its walls as the moon rose high in the night sky",
"laughter echoed through the narrow streets as children played games of hide and seek lanterns flickered in the darkness casting eerie shadows on the cobblestone paths",
"high above the city skyscrapers towered over the skyline their glass facades shimmering in the afternoon sun traffic hummed below a constant symphony of honking horns and revving engines",
"on the rugged coastline waves crashed against the cliffs with relentless force seagulls circled overhead their cries blending with the roar of the ocean",
"in the heart of the forest ancient trees stood tall and majestic their branches reaching towards the sky shafts of sunlight filtered through the canopy dappling the forest floor in a patchwork of light and shadow",
"in a quaint cafe the aroma of freshly brewed coffee mingled with the scent of pastries soft music played in the background as patrons chatted over steaming cups of espresso",
"as dusk fell the city came alive with neon lights and bustling nightlife street performers entertained crowds with music and dance their voices rising above the city's constant hum",
"deep in the valley a river meandered lazily through fields of wildflowers bees buzzed from blossom to blossom collecting nectar in the warm afternoon sun",
"atop the hill a solitary figure stood silhouetted against the setting sun they gazed out over the sprawling landscape lost in contemplation",
"beneath the starlit sky a campfire crackled merrily its flames casting flickering shadows on the faces of those gathered around tales of adventure and bravery filled the air weaving a tapestry of shared memories",
"in the distance thunder rumbled ominously heralding an approaching storm dark clouds gathered on the horizon obscuring the fading light of day",
"amidst the hustle and bustle of the city a street artist created a masterpiece on the pavement passersby stopped to admire the intricate details captivated by the artist's skill",
"on a remote island palm trees swayed gently in the breeze their fronds whispering secrets to the wind crystalclear waters lapped at the sandy shore inviting swimmers to dive in",
"in the depths of the cavern stalactites hung like icicles from the ceiling dripping water onto the smooth stone below a faint echo reverberated through the darkness carrying whispers of ancient tales",
"underneath the ancient ruins archaeologists unearthed artifacts that spoke of civilizations long forgotten each discovery added a piece to the puzzle of history illuminating the past with new insights",
"through the open window the scent of spring blossoms drifted into the room filling it with the promise of renewal birds sang joyfully outside heralding the arrival of warmer days",
"at the top of the mountain a lone climber stood victorious having conquered the peak the world stretched out before them a breathtaking panorama of valleys and peaks"

        ];

        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        typing_text.innerHTML = "";
        for (const char of paragraphs[randomIndex]) {
            typing_text.innerHTML += `<span>${char}</span>`;
        }
        typing_text.querySelectorAll("span")[0].classList.add('active');
        document.addEventListener('keydown', () => input_field.focus());
        typing_text.addEventListener("click", () => input_field.focus());
    }

    function initTyping(e) {
        const chars = typing_text.querySelectorAll("span");
        const typedChar = input_field.value.charAt(charIndex);

        if (e.inputType === 'deleteContentBackward') {
            if (charIndex > 0) {
                charIndex--;
                if (chars[charIndex].classList.contains('incorrect')) {
                    mistake--;
                }
                chars[charIndex].classList.remove('correct', 'incorrect', 'active');
                chars[charIndex].classList.add('active');
            }
        } else {
            if (charIndex < chars.length && timeleft > 0) {
                if (!isTyping) {
                    timer = setInterval(initTime, 1000);
                    isTyping = true;
                }
                if (chars[charIndex].innerText === typedChar) {
                    chars[charIndex].classList.add('correct');
                } else {
                    mistake++;
                    chars[charIndex].classList.add('incorrect');
                }
                charIndex++;
                if (charIndex < chars.length) {
                    chars[charIndex].classList.add('active');
                }
                mistakes.innerText = mistake;
                cpm.innerText = charIndex - mistake;
            } else {
                clearInterval(timer);
                input_field.value = "";
            }
        }
    }

    function initTime() {
        if (timeleft > 0) {
            timeleft--;
            time.innerText = timeleft;
            let wpmval = Math.round(((charIndex - mistake) / 5) / (maxtime - timeleft) * 60);
            wpm.innerText = wpmval;
        } else if(timeleft==0){
            clearInterval(timer);
            input_field.disabled = true;
            alert("Time's up! Click 'Try Again' to retry.");
        }
    }

    function reset() {
        loadParagraph();
        clearInterval(timer);
        timeleft = maxtime;
        time.innerText = timeleft;
        input_field.value = "";
        charIndex = 0;
        mistake = 0;
        isTyping = false;
        wpm.innerText = 0;
        cpm.innerText = 0;
        mistakes.innerText = 0;
        input_field.disabled = false;
    }

    input_field.addEventListener('input', initTyping);
    try_again.addEventListener("click", reset);
    loadParagraph();
}
