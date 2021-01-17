export const environment = {

  //joel 
  //server:"154.72.148.105",
  //server:"kmertv.iplans.cm",
  server:"www.api.kakotel.com",
  apilink:"/api-perfectpay.php?",
  codeApi:"326029964",
  projetPerfectPay:"PERFECTPAY",
  //CodeClient:"5022664154",
  perfectPhone:"233472866",




  //"smsServer": "192.168.40.200:8080" ,
  "smsServer": "sms.iplans.cm",
  "callServer": "",
    "wsServer": "",
    "smsPort": "8080",
    "callPort": "",
    "wsPort": "",

    /**
     * michel
     */

    //apiUrl: 'http://192.168.40.200:8080/iSMS/rest/api/',
    //pk_stripe:"pk_test_w8oGrvYLvf7dH8Yto1BEJK9X",
    pk_stripe:"pk_live_WMbUGdkTHDbcAbYhkUhAJZPd",
    //pk_stripe:"pk_live_r1P5QXiVbPIiAlq5gUwOzeCv00HRtftzJx",
    clientidPaypalSandbox:"AfdZ-AgDqqq4nJwvkxAW9qPbCocA7P7LPFdJlR2ouMp7LZK9vnPtXunMChpcqQQo9O7y9URd8k1bvTVm",
    clientidPaypalProduction:"AROyfruqD-wi-XIaJFaam7DZHrl-AgUABEICwaj107yHB97jU_boULPFdwWoNEPCSNz8G8ZSbI3WBcSF",
    clientpaypal:"AS3FU5KqbPUXgjwFbC2aMTu3oQA8XfH7qoq6ThL81DwkeOL_z0V6G9VcRKNLjBrClfkWAd-TdR3Oj1mT",
    //clientidPaypalProduction:"AbxF_2WReHhxnNt7AxyOvb1kAYNHABFYcqCR7gHZawYtAQB50eRp5xtadU9YSIbfT5J_c5w1ifkdJ3Wp",
    //idClient:"22",
    //testUrl:'http://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/stripe_payment/',
    //testUrlpaypal:'http://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    
    //testInitializeOM:'http://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    
    //paypalPayement:'http://41.77.210.246:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    //testUrlmtnCredit:'http://192.168.40.200:8080/iSMS/rest/api/creditMobilePaiement/'

    //testInitializeOM:'http://sms.iplans.cm/rest/api/omTransactionInitialize/',
    //testTrStatusOM:'http://sms.iplans.cm/rest/api/getTransactionStatus/',
    paypalPayementperfectPay:'http://154.72.148.105:8081/Perfectpay/rest/api/paiement/checkPaypal?',

    /**
     * google
     */

    production: false,    
    //testInitializeOM:'http://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    //testTrStatusOM:'http://41.77.210.246:8080/iSMS/rest/api/getTransactionStatus/',
    //testTrStatusOM:'http://192.168.40.200:8080/iSMS/rest/api/getTransactionStatus/',
    //paypalPayement:'http://41.77.210.246:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    //testInitializeOM:'http://41.77.210.246:8080/iSMS/rest/api/omTransactionInitialize/'
    //testUrlmtnCredit:'http://192.168.40.200:8080/iSMS/rest/api/creditMobilePaiement/'
      


    
    //CREDIT PAIEMENT LIVE
    testTrStatusOM:'http://sms.iplans.cm/rest/api/getTransactionStatus/',
    testInitializeOM:'http://sms.iplans.cm/rest/api/omTransactionInitialize/',
    stripePayement:'http://sms.iplans.cm/rest/api/stripePaymentCredit/',
    mtnPayement:'http://sms.iplans.cm/rest/api/creditMobilePaiement',
    paypalPayement:'http://sms.iplans.cm/rest/api/verifyPaymentCredit/',    
    testUrlmtnCredit:'http://sms.iplans.cm/iSMS/rest/api/creditMobilePaiement/',
    stripePayementV2:'http://sms.iplans.cm/rest/api/stripePaymentCreditV2/', 
    mtnPayementV2:'http://sms.iplans.cm/rest/api/creditMobilePaiementV2',


    //SMS PAIEMENT LIVE
    packageSms:'http://sms.iplans.cm/rest/api/getAllPackage',
    paypalsmspay:'http://sms.iplans.cm/rest/api/verifyPaymentSms/',
    mtnsmspay: 'http://sms.iplans.cm/rest/api/smsMobilePaiement',
    stripesmspay:'http://sms.iplans.cm/rest/api/stripePaymentSMS/',
    soldePerfecttalk:'sms.iplans.cm/rest/api/getSoldeClient/',
    virementFondCarte:'http://sms.iplans.cm/rest/api/fundTransfertToCard/',
    virementFondCarteToCarte:'http://sms.iplans.cm/rest/api/fundTransfertCardToCard/',
    transfertArgent:'http://sms.iplans.cm/rest/api/transfertArgent/',
    getUserOperation:'http://sms.iplans.cm/rest/api/getUserOperation/',
    transfertCreditToMOMO:'http://sms.iplans.cm/rest/api/transfertCreditToMOMO/',
    setCustomerId:'http://sms.iplans.cm/rest/api/setCustomerId/',
    //CREDIT PAIEMENT LIVE
    set_devise :'http://sms.iplans.cm/rest/api/setDevise/',
    pendingPayment :'http://sms.iplans.cm/rest/payment/getPendingPayment/',
    validatePendingPayment :'http://sms.iplans.cm/rest/payment/validatePayment/'

    //SANDBOX TEST
    //testInitializeOM:'http://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    //testUrlmtnCredit:'http://192.168.40.200:8080/iSMS/rest/api/creditMobilePaiement/'
    //testInitializeOM:'http://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    //paypalPayement:'http://41.77.210.246:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    //testInitializeOM:'http://sms.iplans.cm/rest/api/omTransactionInitialize/',
    //testTrStatusOM:'http://sms.iplans.cm/rest/api/getTransactionStatus/',
    //testUrl:'http://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/stripe_payment/',
    //testUrlpaypal:'http://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
};