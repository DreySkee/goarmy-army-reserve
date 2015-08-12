angular.module('ac2rc')
  .factory('benefitsData', function () {

  	var benefitsData = [
  	 	{
  	 		title: "24-Month<br> Deployment Stabilization",
  	 		copy: "When you switch from Active Duty to the Army Reserve, you will get up to 24 months of deferment from involuntary mobilization. This will give you and your family the time needed to establish your civilian life.",
  	 		iconImg: "/images/benefits/icon-1.png"
  	 	},
      {
        title: "Train Close<br> to Home",
        copy: "In the Army Reserve, you can choose a unit that’s close to home or relocate to somewhere with your MOS. Either way, you’ll have the time and flexibility to pursue a civilian career, go back to school, and see your friends and family.",
        iconImg: "/images/benefits/icon-2.png"
      },
      {
        title: "Education<br> Assistance",
        copy: "Where do you see yourself in the future? The Army Reserve wants to help you get there. We offer a Student Loan Repayment Program, the GI Bill and other educational benefits to help you achieve your goals.",
        iconImg: "/images/benefits/icon-3.png"
      },
      {
        title: "Sign-up<br> Bonus",
        copy: "You might qualify for up to $20,000 in bonus money when you transition. Use it to help you relocate, buy a car or simply as a much-needed cushion to help you and your family adjust to civilian life.",
        iconImg: "/images/benefits/icon-4.png"
      },
      {
        title: "Keep or Change<br> MOS",
        copy: "As an Active Duty Soldier, you have the option to keep your current MOS when you transition to the Army Reserve or you have the opportunity to train for a new MOS. There are over 120 Army Reserve specialties to choose from to further your Army and civilian&nbspcareers.",
        iconImg: "/images/benefits/icon-5.png"
      },
      {
        title: "Get a Civilian Job",
        copy: "When you transfer, you’ll also gain assistance in finding civilian employment. Post your profile and connect with employers through the VA's online Veterans Employment Center. Being a part of the Army Reserve will also help you gain an edge in the civilian job market. <a href='https://www.ebenefits.va.gov/ebenefits/jobs' target='_blank'>More about the Veterans Employment Center</a>",
        iconImg: "/images/benefits/icon-6.png"
      },
      {
        title: "Health Care<br> Benefits",
        copy: "By transitioning, you and your family are eligible for Tricare Reserve Select – a low-cost health care insurance plan available for Army&nbspReserve&nbspSoldiers. <a href='http://www.tricare.mil/trs' target='_blank'>More About Tricare Reserve Select</a>",
        iconImg: "/images/benefits/icon-7.png"
      },
      {
        title: "Become an Officer<br> or Warrant Officer",
        copy: "As an Active Duty Soldier, you’ll get to maintain your current rank when you transition to the Army Reserve. If you’re seeking to further your Army career, you also have the chance to apply for a direct commission and become an Officer or apply for the Warrant&nbsp;Officer&nbsp;program.",
        iconImg: "/images/benefits/icon-8.png"
      },
      {
        title: "Retirement",
        copy: "Don’t let the time you’ve put in as an Active Duty Soldier go to waste. When you go from Active Duty to the Army Reserve, all of the years you’ve already served carry over and are applied towards your 20-year retirement.",
        iconImg: "/images/benefits/icon-9.png"
      },
      {
        title: "Service Obligation<br> Reduction",
        copy: "As an Active Army Soldier, if you are nearing the end of your service obligation, you may gain options to reduce your total military commitment if you transfer into the Army Reserve.",
        iconImg: "/images/benefits/icon-10.png"
      }
  	 ]


	return {
	  getBenefitsData: function () {
	    return benefitsData;
	  }
	};
});