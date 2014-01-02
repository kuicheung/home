/**
 * Created by Kiwi on 12/26/13.
 */
define(function(){
    var that={};
    that.Player = Backbone.Model.extend({
        defaults: function(){
            playerId = 0;
            playerImgSrc = 1000;
            audioOgg = "";
            audioMpeg = "";
        }
    });

    return {
        create: function(attr){
            return new that.Player(attr);
        },
        model: that.player

    };
});
