$(function() {

    let APIKey = "a5357212f9c747dac679fc5ab1aa7ca9";
    let correctAnswers = 0;
    $(".movie2, .movie3, .movie4, .movie5, .results").hide();

    /**
     * Získání 15 náhdodných čísel reprezentující výsledky filmů
     * 5 filmů jsou správné odpovědi
     * 10 filmů jsou špatné odpovědi
     * */
    function randomMovieNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let q1_movies = [],
        q2_movies = [],
        q3_movies = [],
        q4_movies = [],
        q5_movies = [];

    let movie1ID, movie1Title, year1,
        director1, castMembers1, actors1,
        image_items1, images1,

        movie2ID, movie2Title, year2,
        director2, castMembers2, actors2,
        image_items2, images2,

        movie3ID, movie3Title, year3,
        director3, castMembers3, actors3,
        image_items3, images3,

        movie4ID, movie4Title, year4,
        director4, castMembers4, actors4,
        image_items4, images4,

        movie5ID, movie5Title, year5,
        director5, castMembers5, actors5,
        image_items5, images5;


    /** Naplňuj pole, dokud není plné
     * (3 náhodná čísla z každých 20 výsledků ze sta)
     * */

    //Výsledky 1. dvacítky výsledků
    while(q1_movies.length < 3) {
        let cislo1 = randomMovieNum(0, 19);

        //Pokud už tento výsledek je v poli, zační znovu
        if (q1_movies.includes(cislo1)) {
            continue;
        }
        //Pokud není, přidej ho do pole
        q1_movies.push(cislo1);
    }

    //Výsledky 2. dvacítky výsledků
    while(q2_movies.length < 3) {
        let cislo2 = randomMovieNum(0, 19);
        if (q2_movies.includes(cislo2)) {
            continue;
        }
        q2_movies.push(cislo2);
    }

    //Výsledky 3. dvacítky výsledků
    while(q3_movies.length < 3) {
        let cislo3 = randomMovieNum(0, 19);
        if (q3_movies.includes(cislo3)) {
            continue;
        }
        q3_movies.push(cislo3);
    }

    //Výsledky 4. dvacítky výsledků

    while(q4_movies.length < 3) {
        let cislo4 = randomMovieNum(0, 19);
        if (q4_movies.includes(cislo4)) {
            continue;
        }
        q4_movies.push(cislo4);
    }

    //Výsledky 5. dvacítky výsledků
    while(q5_movies.length < 3) {
        let cislo5 = randomMovieNum(0, 19);
        if (q5_movies.includes(cislo5)) {
            continue;
        }
        q5_movies.push(cislo5);
    }

    //Zjištění, zda daná film už nebyl hádán

    //Náhodné vybrání 1 filmu v každé trojici, tento film se bude hádat
    let movie1Num = q1_movies[Math.floor(Math.random()*q1_movies.length)];
    let movie2Num = q2_movies[Math.floor(Math.random()*q2_movies.length)];
    let movie3Num = q3_movies[Math.floor(Math.random()*q3_movies.length)];
    let movie4Num = q4_movies[Math.floor(Math.random()*q4_movies.length)];
    let movie5Num = q5_movies[Math.floor(Math.random()*q5_movies.length)];

    // ! ! ! LOCAL STORAGE, funguje jen někdy
    /*
    if  (localStorage.getItem("itemMovie3") === null) { //Návštěvník ještě nikdy nehádal
        localStorage.setItem("itemMovie3", movie3Num);
    }
    else if (movie3Num === localStorage.getItem("itemMovie3")) { //Návštěvník tento film už někdy hádal
        do {
            movie3Num = q3_movies[Math.floor(Math.random() * q3_movies.length)];
        }
        while (movie3Num === localStorage.getItem("itemMovie3"));
        return movie3Num;
    }

    */

    //HÁDÁNÍ PRVNÍHO FILMU =========================================================
    //Rok, název a ID filmu
    $.getJSON("https://api.themoviedb.org/3/discover/movie" +
        "?api_key=" + APIKey +
        "&language=en-US" +
        "&sort_by=popularity.desc" +
        "&include_adult=false" +
        "&with_original_language=en&page=1",
        function (data) {
            year1 = " " + data.results[movie1Num].release_date.substring(0, 4);
            $(".year1").append(year1);

            movie1ID = data.results[movie1Num].id;
            movie1Title = data.results[movie1Num].title;

            //Kredity získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie1ID + "/credits" +
                "?api_key=" + APIKey, function(data) {

                    //Režiséři z kreditů
                    director1 = [];
                    data.crew.forEach(function(entry){
                        if (entry.job === 'Director') {
                            director1.push(entry.name);
                        }
                    });
                    $(".director1").append(' ' + director1.join(', '));

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce cast,
                    * pak se z výsledků ukladají atributy name do řetězce,
                    * jednotlivé jeho položky se poté vypisují. */
                    castMembers1 = data.cast.slice(0, 5);
                    actors1 = [];

                    for(let j = 0; j < 5; j++) {
                        actors1[j] = castMembers1[j].name;
                    }
                    $(".actors1").append(' ' + actors1.join(', '));

                }
            );

            //Obrázky získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie1ID + "?api_key=" + APIKey +
                "&language=en-US" +
                "&append_to_response=images" +
                "&include_image_language=en," +
                "null",
                function(data) {

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce
                     * images.backdrops, pak se z výsledků ukladají atributy
                     * file_path do řetězce, jednotlivé jeho položky se poté
                     * vypisují do absolutních adres obrázeků. */
                    image_items1 = data.images.backdrops.slice(0, 4);
                    images1 = [];

                    for(let k = 0; k < 4; k++) {
                        images1[k] =
                            "http://image.tmdb.org/t/p/w185" +
                            image_items1[k].file_path;

                        $(".images1").append(
                            //Tato varianta neuzavírá img tag
                            $('<img />',{alt:'Image of the movie as a clue',
                                src:images1[k]})
                        );
                    }
                }
            );

            let movie1Position = q1_movies.indexOf(movie1Num);

            //Díky podmínce níže jsou vybrány nějaké dva následující nesprávné filmy
            let mov11_Ttile = data.results[q1_movies[0]].title;
            let mov12_Ttile = data.results[q1_movies[1]].title;
            let mov13_Ttile = data.results[q1_movies[2]].title;

            //Uložení selektorů do proměnných
            let $label_mov11 = $("label[for='mov11']");
            let $label_mov12 = $("label[for='mov12']");
            let $label_mov13 = $("label[for='mov13']");
            let $title_mov11 = $('#mov11');
            let $title_mov12 = $('#mov12');
            let $title_mov13 = $('#mov13');

            //Pořadí správné otázky a dalších dvou nesprávných
                //1. správná
            if (movie1Position === 0) {
                $label_mov11.append(movie1Title);
                $title_mov11.val(movie1Title);
                $label_mov12.append(mov12_Ttile);
                $title_mov12.val(mov12_Ttile);
                $label_mov13.append(mov13_Ttile);
                $title_mov13.val(mov13_Ttile);
            }
                //2. správná
            else if (movie1Position === 1) {
                $label_mov11.append(mov11_Ttile);
                $title_mov11.val(mov11_Ttile);
                $label_mov12.append(movie1Title);
                $title_mov12.val(movie1Title);
                $label_mov13.append(mov13_Ttile);
                $title_mov13.val(mov13_Ttile);
            }
            else {
                //3. správná
                $label_mov11.append(mov11_Ttile);
                $title_mov11.val(mov11_Ttile);
                $label_mov12.append(mov12_Ttile);
                $title_mov12.val(mov12_Ttile);
                $label_mov13.append(movie1Title);
                $title_mov13.val(movie1Title);
            }

            //Vyhodnocení správných odpovědí
            $(".movie1 .option-item input").change(function () {
                if (movie1Title === document.movie1.movie_option1.value) {
                    $(this).parent().addClass("correct-answer");
                    correctAnswers++;
                }
                else {
                    $(this).parent().addClass("incorrect-answer");
                }

                $(".movie1 .option-item input")
                    .attr('disabled', true)
                    .addClass("disabled-radio");
                $(".movie2").show(function() {
                    $(".movie2").slideDown();
                    $("form:first-of-type").removeClass("border-first-movie");
                });
            });

        }


    );

    //HÁDÁNÍ DRUHÉHO FILMU =========================================================
    //Rok, název a ID filmu
    $.getJSON("https://api.themoviedb.org/3/discover/movie" +
        "?api_key=" + APIKey +
        "&language=en-US" +
        "&sort_by=popularity.desc" +
        "&include_adult=false" +
        "&with_original_language=en&page=2",
        function (data) {
            year2 = " " + data.results[movie2Num].release_date.substring(0, 4);
            $(".year2").append(year2);

            movie2ID = data.results[movie2Num].id;
            movie2Title = data.results[movie2Num].title;

            //Kredity získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie2ID + "/credits" +
                "?api_key=" + APIKey, function(data) {

                    //Režiséři z kreditů
                    director2 = [];
                    data.crew.forEach(function(entry){
                        if (entry.job === 'Director') {
                            director2.push(entry.name);
                        }
                    });
                    $(".director2").append(' ' + director2.join(', '));

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce cast,
                    * pak se z výsledků ukladají atributy name do řetězce,
                    * jednotlivé jeho položky se poté vypisují. */
                    castMembers2 = data.cast.slice(0, 5);
                    actors2 = [];

                    for(let j = 0; j < 5; j++) {
                        actors2[j] = castMembers2[j].name;
                    }
                    $(".actors2").append(' ' + actors2.join(', '));

                }
            );

            //Obrázky získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie2ID + "?api_key=" + APIKey +
                "&language=en-US" +
                "&append_to_response=images" +
                "&include_image_language=en," +
                "null",
                function(data) {

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce
                     * images.backdrops, pak se z výsledků ukladají atributy
                     * file_path do řetězce, jednotlivé jeho položky se poté
                     * vypisují do absolutních adres obrázeků. */
                    image_items2 = data.images.backdrops.slice(0, 4);
                    images2 = [];

                    for(let k = 0; k < 4; k++) {
                        images2[k] =
                            "http://image.tmdb.org/t/p/w185" +
                            image_items2[k].file_path;

                        $(".images2").append(
                            //Tato varianta neuzavírá img tag
                            $('<img />',{alt:'Image of the movie as a clue',
                                src:images2[k]})
                        );
                    }
                }
            );



            let movie2Position = q2_movies.indexOf(movie2Num);

            //Díky podmínce níže jsou vybrány nějaké dva následující nesprávné filmy
            let mov21_Ttile = data.results[q2_movies[0]].title;
            let mov22_Ttile = data.results[q2_movies[1]].title;
            let mov23_Ttile = data.results[q2_movies[2]].title;

            //Uložení selektorů do proměnných
            let $label_mov21 = $("label[for='mov21']");
            let $label_mov22 = $("label[for='mov22']");
            let $label_mov23 = $("label[for='mov23']");
            let $title_mov21 = $('#mov21');
            let $title_mov22 = $('#mov22');
            let $title_mov23 = $('#mov23');

            //Pořadí správné otázky a dalších dvou nesprávných
            //1. správná
            if (movie2Position === 0) {
                $label_mov21.append(movie2Title);
                $title_mov21.val(movie2Title);
                $label_mov22.append(mov22_Ttile);
                $title_mov22.val(mov22_Ttile);
                $label_mov23.append(mov23_Ttile);
                $title_mov23.val(mov23_Ttile);
            }
            //2. správná
            else if (movie2Position === 1) {
                $label_mov21.append(mov21_Ttile);
                $title_mov21.val(mov21_Ttile);
                $label_mov22.append(movie2Title);
                $title_mov22.val(movie2Title);
                $label_mov23.append(mov23_Ttile);
                $title_mov23.val(mov23_Ttile);
            }
            else {
                //3. správná
                $label_mov21.append(mov21_Ttile);
                $title_mov21.val(mov21_Ttile);
                $label_mov22.append(mov22_Ttile);
                $title_mov22.val(mov22_Ttile);
                $label_mov23.append(movie2Title);
                $title_mov23.val(movie2Title);
            }

            //Vyhodnocení správných odpovědí
            $(".movie2 .option-item input").change(function () {
                if (movie2Title === document.movie2.movie_option2.value) {
                    $(this).parent().addClass("correct-answer");
                    correctAnswers++;
                }
                else {
                    $(this).parent().addClass("incorrect-answer");
                }

                $(".movie2 .option-item input")
                    .attr('disabled', true)
                    .addClass("disabled-radio");
                $(".movie3").show(function() {
                    $(".movie3").slideDown();
                });

            });

        }
    );


    //HÁDÁNÍ TŘETÍHO FILMU =========================================================
    //Rok, název a ID filmu
    $.getJSON("https://api.themoviedb.org/3/discover/movie" +
        "?api_key=" + APIKey +
        "&language=en-US" +
        "&sort_by=popularity.desc" +
        "&include_adult=false" +
        "&with_original_language=en&page=3",
        function (data) {
            year3 = " " + data.results[movie3Num].release_date.substring(0, 4);
            $(".year3").append(year3);

            movie3ID = data.results[movie3Num].id;
            movie3Title = data.results[movie3Num].title;

            //Kredity získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie3ID + "/credits" +
                "?api_key=" + APIKey, function(data) {

                    //Režiséři z kreditů
                    director3 = [];
                    data.crew.forEach(function(entry){
                        if (entry.job === 'Director') {
                            director3.push(entry.name);
                        }
                    });
                    $(".director3").append(' ' + director3.join(', '));

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce cast,
                    * pak se z výsledků ukladají atributy name do řetězce,
                    * jednotlivé jeho položky se poté vypisují. */
                    castMembers3 = data.cast.slice(0, 5);
                    actors3 = [];

                    for(let j = 0; j < 5; j++) {
                        actors3[j] = castMembers3[j].name;
                    }
                    $(".actors3").append(' ' + actors3.join(', '));
                }
            );

            //Obrázky získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie3ID + "?api_key=" + APIKey +
                "&language=en-US" +
                "&append_to_response=images" +
                "&include_image_language=en," +
                "null",
                function(data) {

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce
                     * images.backdrops, pak se z výsledků ukladají atributy
                     * file_path do řetězce, jednotlivé jeho položky se poté
                     * vypisují do absolutních adres obrázeků. */
                    image_items3 = data.images.backdrops.slice(0, 4);
                    images3 = [];

                    for(let k = 0; k < 4; k++) {
                        images3[k] =
                            "http://image.tmdb.org/t/p/w185" +
                            image_items3[k].file_path;

                        $(".images3").append(
                            //Tato varianta neuzavírá img tag
                            $('<img />',{alt:'Image of the movie as a clue',
                                src:images3[k]})
                        );
                    }
                }
            );

            let movie3Position = q3_movies.indexOf(movie3Num);

            //Díky podmínce níže jsou vybrány nějaké dva následující nesprávné filmy
            let mov31_Ttile = data.results[q3_movies[0]].title;
            let mov32_Ttile = data.results[q3_movies[1]].title;
            let mov33_Ttile = data.results[q3_movies[2]].title;

            //Uložení selektorů do proměnných
            let $label_mov31 = $("label[for='mov31']");
            let $label_mov32 = $("label[for='mov32']");
            let $label_mov33 = $("label[for='mov33']");
            let $title_mov31 = $('#mov31');
            let $title_mov32 = $('#mov32');
            let $title_mov33 = $('#mov33');

            //Pořadí správné otázky a dalších dvou nesprávných
            //1. správná
            if (movie3Position === 0) {
                $label_mov31.append(movie3Title);
                $title_mov31.val(movie3Title);
                $label_mov32.append(mov32_Ttile);
                $title_mov32.val(mov32_Ttile);
                $label_mov33.append(mov33_Ttile);
                $title_mov33.val(mov33_Ttile);
            }
            //3. správná
            else if (movie3Position === 1) {
                $label_mov31.append(mov31_Ttile);
                $title_mov31.val(mov31_Ttile);
                $label_mov32.append(movie3Title);
                $title_mov32.val(movie3Title);
                $label_mov33.append(mov33_Ttile);
                $title_mov33.val(mov33_Ttile);
            }
            else {
                //3. správná
                $label_mov31.append(mov31_Ttile);
                $title_mov31.val(mov31_Ttile);
                $label_mov32.append(mov32_Ttile);
                $title_mov32.val(mov32_Ttile);
                $label_mov33.append(movie3Title);
                $title_mov33.val(movie3Title);
            }

            //Vyhodnocení správných odpovědí
            $(".movie3 .option-item input").change(function () {
                if (movie3Title === document.movie3.movie_option3.value) {
                    $(this).parent().addClass("correct-answer");
                    correctAnswers++;
                }
                else {
                    $(this).parent().addClass("incorrect-answer");
                }

                $(".movie3 .option-item input")
                    .attr('disabled', true)
                    .addClass("disabled-radio");
                $(".movie4").show(function() {
                    $(".movie4").slideDown();
                });
            });

        }
    );

    //HÁDÁNÍ ČTVRTÉHO FILMU =========================================================
    //Rok, název a ID filmu
    $.getJSON("https://api.themoviedb.org/3/discover/movie" +
        "?api_key=" + APIKey +
        "&language=en-US" +
        "&sort_by=popularity.desc" +
        "&include_adult=false" +
        "&with_original_language=en&page=4",
        function (data) {
            year4 = " " + data.results[movie4Num].release_date.substring(0, 4);
            $(".year4").append(year4);

            movie4ID = data.results[movie4Num].id;
            movie4Title = data.results[movie4Num].title;

            //Kredity získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie4ID + "/credits" +
                "?api_key=" + APIKey, function(data) {

                    //Režiséři z kreditů
                    director4 = [];
                    data.crew.forEach(function(entry){
                        if (entry.job === 'Director') {
                            director4.push(entry.name);
                        }
                    });
                    $(".director4").append(' ' + director4.join(', '));

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce cast,
                    * pak se z výsledků ukladají atributy name do řetězce,
                    * jednotlivé jeho položky se poté vypisují. */
                    castMembers4 = data.cast.slice(0, 5);
                    actors4 = [];

                    for(let j = 0; j < 5; j++) {
                        actors4[j] = castMembers4[j].name;
                    }
                    $(".actors4").append(' ' + actors4.join(', '));
                }
            );

            //Obrázky získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie4ID + "?api_key=" + APIKey +
                "&language=en-US" +
                "&append_to_response=images" +
                "&include_image_language=en," +
                "null",
                function(data) {

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce
                     * images.backdrops, pak se z výsledků ukladají atributy
                     * file_path do řetězce, jednotlivé jeho položky se poté
                     * vypisují do absolutních adres obrázeků. */
                    image_items4 = data.images.backdrops.slice(0, 4);
                    images4 = [];

                    for(let k = 0; k < 4; k++) {
                        images4[k] =
                            "http://image.tmdb.org/t/p/w185" +
                            image_items4[k].file_path;

                        $(".images4").append(
                            //Tato varianta neuzavírá img tag
                            $('<img />',{alt:'Image of the movie as a clue',
                                src:images4[k]})
                        );
                    }
                }
            );

            let movie4Position = q4_movies.indexOf(movie4Num);

            //Díky podmínce níže jsou vybrány nějaké dva následující nesprávné filmy
            let mov41_Ttile = data.results[q4_movies[0]].title;
            let mov42_Ttile = data.results[q4_movies[1]].title;
            let mov43_Ttile = data.results[q4_movies[2]].title;

            //Uložení selektorů do proměnných
            let $label_mov41 = $("label[for='mov41']");
            let $label_mov42 = $("label[for='mov42']");
            let $label_mov43 = $("label[for='mov43']");
            let $title_mov41 = $('#mov41');
            let $title_mov42 = $('#mov42');
            let $title_mov43 = $('#mov43');

            //Pořadí správné otázky a dalších dvou nesprávných
            //1. správná
            if (movie4Position === 0) {
                $label_mov41.append(movie4Title);
                $title_mov41.val(movie4Title);
                $label_mov42.append(mov42_Ttile);
                $title_mov42.val(mov42_Ttile);
                $label_mov43.append(mov43_Ttile);
                $title_mov43.val(mov43_Ttile);
            }
            //3. správná
            else if (movie4Position === 1) {
                $label_mov41.append(mov41_Ttile);
                $title_mov41.val(mov41_Ttile);
                $label_mov42.append(movie4Title);
                $title_mov42.val(movie4Title);
                $label_mov43.append(mov43_Ttile);
                $title_mov43.val(mov43_Ttile);
            }
            else {
                //3. správná
                $label_mov41.append(mov41_Ttile);
                $title_mov41.val(mov41_Ttile);
                $label_mov42.append(mov42_Ttile);
                $title_mov42.val(mov42_Ttile);
                $label_mov43.append(movie4Title);
                $title_mov43.val(movie4Title);
            }

            //Vyhodnocení správných odpovědí
            $(".movie4 .option-item input").change(function () {
                if (movie4Title === document.movie4.movie_option4.value) {
                    $(this).parent().addClass("correct-answer");
                    correctAnswers++;
                }
                else {
                    $(this).parent().addClass("incorrect-answer");
                }

                $(".movie4 .option-item input")
                    .attr('disabled', true)
                    .addClass("disabled-radio");
                $(".movie5").show(function() {
                    $(".movie5").slideDown();
                });
            });

        }
    );

    //HÁDÁNÍ PÁTÉHO FILMU =========================================================
    //Rok, název a ID filmu
    $.getJSON("https://api.themoviedb.org/3/discover/movie" +
        "?api_key=" + APIKey +
        "&language=en-US" +
        "&sort_by=popularity.desc" +
        "&include_adult=false" +
        "&with_original_language=en&page=5",
        function (data) {
            year5 = " " + data.results[movie5Num].release_date.substring(0, 4);
            $(".year5").append(year5);

            movie5ID = data.results[movie5Num].id;
            movie5Title = data.results[movie5Num].title;

            //Kredity získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie5ID + "/credits" +
                "?api_key=" + APIKey, function(data) {

                    //Režiséři z kreditů
                    director5 = [];
                    data.crew.forEach(function(entry){
                        if (entry.job === 'Director') {
                            director5.push(entry.name);
                        }
                    });
                    $(".director5").append(' ' + director5.join(', '));

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce cast,
                    * pak se z výsledků ukladají atributy name do řetězce,
                    * jednotlivé jeho položky se poté vypisují. */
                    castMembers5 = data.cast.slice(0, 5);
                    actors5 = [];

                    for(let j = 0; j < 5; j++) {
                        actors5[j] = castMembers5[j].name;
                    }
                    $(".actors5").append(' ' + actors5.join(', '));
                }
            );

            //Obrázky získané díky ID filmu
            $.getJSON("https://api.themoviedb.org/3/movie/" +
                movie5ID + "?api_key=" + APIKey +
                "&language=en-US" +
                "&append_to_response=images" +
                "&include_image_language=en," +
                "null",
                function(data) {

                    //Herci z kreditů
                    /* Nejdřív se vybere prvních pět výsledků ze sekce
                     * images.backdrops, pak se z výsledků ukladají atributy
                     * file_path do řetězce, jednotlivé jeho položky se poté
                     * vypisují do absolutních adres obrázeků. */
                    image_items5 = data.images.backdrops.slice(0, 4);
                    images5 = [];

                    for(let k = 0; k < 4; k++) {
                        images5[k] =
                            "http://image.tmdb.org/t/p/w185" +
                            image_items5[k].file_path;

                        $(".images5").append(
                            // ! Tato varianta neuzavírá img tag
                            $('<img />',{alt:'Image of the movie as a clue',
                                src:images5[k]})
                        );
                    }
                }
            );

            let movie5Position = q5_movies.indexOf(movie5Num);

            //Díky podmínce níže jsou vybrány nějaké dva následující nesprávné filmy
            let mov51_Ttile = data.results[q5_movies[0]].title;
            let mov52_Ttile = data.results[q5_movies[1]].title;
            let mov53_Ttile = data.results[q5_movies[2]].title;

            //Uložení selektorů do proměnných
            let $label_mov51 = $("label[for='mov51']");
            let $label_mov52 = $("label[for='mov52']");
            let $label_mov53 = $("label[for='mov53']");
            let $title_mov51 = $('#mov51');
            let $title_mov52 = $('#mov52');
            let $title_mov53 = $('#mov53');

            //Pořadí správné otázky a dalších dvou nesprávných
            //1. správná
            if (movie5Position === 0) {
                $label_mov51.append(movie5Title);
                $title_mov51.val(movie5Title);
                $label_mov52.append(mov52_Ttile);
                $title_mov52.val(mov52_Ttile);
                $label_mov53.append(mov53_Ttile);
                $title_mov53.val(mov53_Ttile);
            }
            //3. správná
            else if (movie5Position === 1) {
                $label_mov51.append(mov51_Ttile);
                $title_mov51.val(mov51_Ttile);
                $label_mov52.append(movie5Title);
                $title_mov52.val(movie5Title);
                $label_mov53.append(mov53_Ttile);
                $title_mov53.val(mov53_Ttile);
            }
            else {
                //3. správná
                $label_mov51.append(mov51_Ttile);
                $title_mov51.val(mov51_Ttile);
                $label_mov52.append(mov52_Ttile);
                $title_mov52.val(mov52_Ttile);
                $label_mov53.append(movie5Title);
                $title_mov53.val(movie5Title);
            }

            //Vyhodnocení správných odpovědí
            $(".movie5 .option-item input").change(function () {
                if (movie5Title === document.movie5.movie_option5.value) {
                    $(this).parent().addClass("correct-answer");
                    correctAnswers++;
                }
                else {
                    $(this).parent().addClass("incorrect-answer");
                }

                //Zprávy ohledně výsldků
                let score;
                let message;
                if (correctAnswers === 0) {
                    score = 0;
                    message = score + "/100 (SUPER BAD!)";
                }
                else if (correctAnswers === 1) {
                    score = 20;
                    message = score + "/100 (VERY BAD)";
                }
                else if (correctAnswers === 2) {
                    score = 40;
                    message = score + "/100 (NO THAT BAD)";
                }
                else if (correctAnswers === 3) {
                    score = 60;
                    message = score + "/100 (GOOD)";
                }
                else if (correctAnswers === 4) {
                    score = 80;
                    message = score + "/100 (GREAT)";
                }
                else {
                    score = 100;
                    message = score + "/100 (AMAZING!)";
                }

                $(".movie5 .option-item input")
                    .attr('disabled', true)
                    .addClass("disabled-radio");
                $(".results").show(function() {
                    $(".results").slideDown();
                    $(".results span:first-of-type")
                        .append(" " + correctAnswers + "/5")
                    $(".results span:last-of-type")
                        .append(" " + message);
                });
            });

        }
    );
});