"use strict";
class Agenda {
    url;
    endUrl = ".json";

    constructor(url){
        this.url = url;
    }

    getCurrentSeasonInfo(){
        var html = "";
        var currentSeasonUrl = this.url + "/current" + this.endUrl;
        $.ajax({
            url: currentSeasonUrl,
            dataType: "json",
            method: 'GET',
            success: function (datos) {
                var datosRaces = datos.MRData.RaceTable.Races;
                html +="<ul>";
                $.each(datosRaces, function(i, item){
                    html +="<li>"  + item.raceName + "</li>";
                    html += "<ul>";
                    html += "<li>" + item.Circuit.circuitName +"</li>";
                    html += "<li>" + item.Circuit.Location.lat + ", " + item.Circuit.Location.long +"</li>";
                    html += "<li>" + item.Qualifying.date + " a las " + item.Qualifying.time +"</li>";
                    html += "</ul>";                    
                })
                html +="</ul>";
                $("section").append(html);
            },error: function (err) {
                console.log(err)                
            }
        })
    }
}

var agenda = new Agenda("http://ergast.com/api/f1");