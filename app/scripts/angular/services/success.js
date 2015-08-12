angular.module('ac2rc')
  .factory('ac2rcData', function () {

  	var successData = [
  	 	{
  	 		name: "CPT Christie Plackis",
  	 		title: "Plans Officer (G2)",
  	 		benefits: "Health Care Benefits, Train Close to Home",
  	 		quote: "The transition process went smoothly because of the outstanding RCCCs at both my previous duty station and training unit. They went out of their way to find me the perfect fit – just the job I was looking for, in the location I wanted to be.",
  	 		bgImg: "/images/success/1-bg.jpg",
        mobileBgImg: "/images/mobile/success/1-bg.jpg",
  	 		avatarImg: "/images/success/1.png"
  	 	},
  	 	{
  	 		name: "CPT Brian J. Martin",
  	 		title: "Public Affairs Officer (46A)",
  	 		benefits: "Train Close to Home, Educational Assistance, Sign-Up Bonus, Changed MOS",
  	 		quote: "I was looking to go back to school to get my MBA. I also wanted to have greater control of where I lived so that I didn't have to move my family every few years. The Army Reserve offered a perfect complement for using my GI Bill and attending school full time.",
  	 		bgImg: "/images/success/4-bg.jpg",
        mobileBgImg: "/images/mobile/success/4-bg.jpg",
  	 		avatarImg: "/images/success/4.png"
  	 	},
      {
        name: "CPT Brandon Matson",
        title: "Quartermaster Officer (92A)",
        benefits: "Sign-Up Bonus, Changed MOS, Educational Assistance, Health Care Benefits",
        quote: "The Officer Affiliation Bonus was the main incentive being offered that appealed to me. I also wanted to pursue a different Military Occupation in the Logistics branch so Army Reserve was the obvious choice.",
        bgImg: "/images/success/3-bg.jpg",
        mobileBgImg: "/images/mobile/success/3-bg.jpg",
        avatarImg: "/images/success/3.png"
      },
  	 	{
  	 		name: "SSG Harley Shanklin",
  	 		title: "Health Care Specialist (68W)",
  	 		benefits: "Health Care Benefits, Sign-Up Bonus, 24-Month Deployment Stabilization",
  	 		quote: "I have to admit that my expectations for the Army Reserve were pretty low, and I was pleasantly surprised. The Army Reserve operates almost identical to the AC. Their knowledge, skills, bearing, appearance and leadership are on par with most AC units that I came in contact with during my military service.",
  	 		bgImg: "/images/success/5-bg.jpg",
        mobileBgImg: "/images/mobile/success/5-bg.jpg",
  	 		avatarImg: "/images/success/5.png"
  	 	},
      {
        name: "SPC Nicholas Sandy",
        title: "Rotary Wing Aviator (153A)",
        benefits: "Changed MOS, Educational Assistance",
        quote: "One of the main reasons I wanted to make this transition is to go to school full time and finish my degree while still being able to serve my country. The biggest benefit the Army Reserve has given me is time to pursue my life goals.",
        bgImg: "/images/success/2-bg.jpg",
        mobileBgImg: "/images/mobile/success/2-bg.jpg",
        avatarImg: "/images/success/2.png"
      },
      {
        name: "CPT Natasha Pennyfeather",
        title: "Human Resources Officer (42B)",
        benefits: "Sign-Up Bonus, Civilian Job Assistance, Changed MOS",
        quote: "After joining the Army Reserve, I was able to change my MOS to Information Systems, Commission as an Army Reserve  Officer, and mobilize at the Pentagon, USSOCOM, and the Joint Communications Support Element.",
        bgImg: "/images/success/6-bg.jpg",
        mobileBgImg: "/images/mobile/success/6-bg.jpg",
        avatarImg: "/images/success/6.png"
      }
  	 ]


	return {
	  getSuccessData: function () {
	    return successData;
	  }
	};
});