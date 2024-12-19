class Fondo{
    pais;
    capital;
    circuito;

    constructor(pais, capital, circuito){
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;
    }

    getImage() {
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI,
            {
                tags: this.circuito + ",F1",
                tagmode: "all",
                format: "json"
            })
            .done(function (data) {
                $("body").css("background-image", "url("+ data.items[ Math.floor(Math.random() * 20)].media.m.slice(0, -5)+"b"+data.items[ Math.floor(Math.random() * 20)].media.m.slice(-4)+")");
                $("body").css("background-repeat", "no-repeat");
                $("body").css("background-attachment", "fixed");
                $("body").css("background-size", "100% 100%");
            });
    };

}

