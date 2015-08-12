jQuery.fn.highlight = function (str, className, wordDesc, wordLink) {
    var regex = new RegExp("\\b" + str + "\\b", "gi");
    return this.each(function () {
        jQuery(this).contents().filter(function() {
            return this.nodeType == 3 && regex.test(this.nodeValue);
        }).replaceWith(function() {
            return (this.nodeValue || "").replace(regex, function(match) {
                return "<span class=\"" + className + "\"><span class=\"word\">" + match + "</span><div class=\"wordpopeffect\"><div class='wordtipX'>X</div>" + wordDesc + "<div class=\"wordpoplrnMore\"><a href=\"" + wordLink + "\"" + " name=\"" + "wtip:" + match.replace(/ /g, "_") + "\">Learn More</a></div><div class='after-arrow-wrapper'></div></div><div class='arrow-wrapper'><div class='arrow-wordtip'></div></div></span>";
            });
        });
    });
};

jQuery(document).ready(function () {
    var divTargets = [ '.pageheadertext #page_title p', '.item p.cl_desc', '.tti .horizontal p', '.tti .vertical p' , '#lead p', '.story_excerpt p', '#profile li'];
    var targetWords = {
        "enlisted" : "Enlisted Soldiers perform specific job functions and have the knowledge that ensures the success of their unit's current mission within the Army.",
        "soldier" : "The Army has three categories of Soldiers: Enlisted Soldiers, Warrant Officers and Commissioned Officers.",
        "warrant officer" : "A Warrant Officer is a highly specialized expert and trainer in his or her career field.",
        "warrant officers" : "A Warrant Officer is a highly specialized expert and trainer in his or her career field.",
        "officer" : "Commissioned Officers are the managers, problem solvers, key influencers and planners who lead Enlisted Soldiers in all situations.",
        "officers" : "Commissioned Officers are the managers, problem solvers, key influencers and planners who lead Enlisted Soldiers in all situations.",
        "officership" : "Commissioned Officers are the managers, problem solvers, key influencers and planners who lead Enlisted Soldiers in all situations.",
        "active duty" : "Active Duty is similar to working at a full-time civilian job.",
        "army reserve" : "The Army Reserve is more like a part-time job that enables you to keep your civilian career while you continue to train near home and serve your country.",
        "amedd" : "The U.S. Army Health Care team is comprised of professional doctors and nurses that tend to the medical needs of all Soldiers.",
        "rotc" : "Army Reserve Officer Training Corps enables students to enroll in elective leadership and military courses at colleges and universities in addition to their required courses.",
        "ocs" : "Officer Candidate School allows college graduates to gain the knowledge and skills necessary to be commissioned as an Army Officer."
    };
    
    var targetWordLinks = {
            "enlisted" : "/careers-and-jobs/enlisted-soldier.html",
            "soldier" : "/about/service-options.html",
            "warrant officer" : "/careers-and-jobs/become-an-officer/army-officer-jobs/warrant-officer.html",
            "warrant officers" : "/careers-and-jobs/become-an-officer/army-officer-jobs/warrant-officer.html",
            "officer" : "/careers-and-jobs/become-an-officer.html",
            "officers" : "/careers-and-jobs/become-an-officer.html",
            "officership" : "/careers-and-jobs/become-an-officer.html",
            "active duty" : "/about/service-options/active-duty.html",
            "army reserve" : "/reserve.html",
            "amedd" : "/amedd.html",
            "rotc" : "/rotc.html",
            "ocs" : "/careers-and-jobs/become-an-officer/how-to-become-an-officer-in-the-army/officer-candidate-school.html"
     }; 
     
    var timeOut;
    var removeTimeOut;
    var targetHoverID
    // Iterate target divs
    jQuery.each( divTargets, function(index, value) {
        jQuery(value).each(function() {
            // Wrap target words in span class, keep case sensitivity
            jQuery.each(targetWords, function(k, v) {
                jQuery(value).highlight(k, "targetword", targetWords[k], targetWordLinks[k]);
            });
        });
    });
    
    jQuery('.targetword').hover(function(){
        if(targetHoverID!=jQuery(this)&&targetHoverID!=null) {
            targetHoverID.find('.wordpopeffect').fadeOut();
            targetHoverID.find('.arrow-wrapper').fadeOut();
        }
        targetHoverID = jQuery(this);
        var popLeft;
        var popDirection = "left";
        var popPosition;
        
        //If opening a new wordtip before previous finishes timeouts
        jQuery('.wordtipX').click(function(){
            targetHoverID.find('.wordpopeffect').fadeOut();
            targetHoverID.find('.arrow-wrapper').fadeOut();
        });
        //Clear closing timeout and set opening timeout 
        clearTimeout(removeTimeOut);
        timeOut = setTimeout(function(){
            
            var popPosition = targetHoverID.position();        
            var popTop = (popPosition.top - targetHoverID.find('.wordpopeffect').outerHeight()) - 15;
            
            if(targetHoverID.height() > targetHoverID.parent().css("line-height").replace(/px/g,"")){
                popLeft = popPosition.left + (targetHoverID.outerWidth()/2) + (targetHoverID.find('.wordpopeffect').outerWidth()/2);
            } else {
                popLeft = popPosition.left + (targetHoverID.outerWidth()/2) - (targetHoverID.find('.wordpopeffect').outerWidth()/2);
            }

            targetHoverID.find('.arrow-wrapper').css('top', popTop + jQuery('.wordpopeffect').outerHeight())
            .css('left',popLeft+jQuery('.wordpopeffect').width()/2 - 8-100);
            if(popLeft < 0 && targetHoverID.find('.arrow-wrapper').css('position')!='fixed') {
                popLeft = 0;
                jQuery('.arrow-wrapper').css('left', (targetHoverID.position().left)-100);
            } else if(popLeft + jQuery(".wordpopeffect").width() > jQuery(document).width()) {
                targetHoverID.find('.wordpopeffect').css('left', '');
                popDirection = "right";
                popLeft = 0;
            }
            
            targetHoverID.css('text-decoration','none');
            targetHoverID.find('.wordpopeffect').css('top', popTop)
            .css(popDirection, popLeft)
            .css('position', 'absolute')
            .fadeIn('slow');
            targetHoverID.find('.arrow-wrapper').css('top', popTop +  targetHoverID.find('.wordpopeffect').outerHeight())
            .fadeIn('slow');
            
        }, 500);   
    }, function() {
        //clear opening timout and set closing timeout
        clearTimeout(timeOut);
        removeTimeOut = setTimeout(function() {
            jQuery(targetHoverID).find('.wordpopeffect').fadeOut();
            jQuery(targetHoverID).find('.arrow-wrapper').fadeOut();
        }, 500);
    });
});