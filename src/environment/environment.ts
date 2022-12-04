export const environment = {

  //joel 
  unsecureServer:"http://154.72.148.105:8081",
  server:"https://api.kakotel.com",
  apilink:"/api-perfectpay.php?",
  apiGimacLink:"/api-gimacpay_mobile.php?",
  apiGimacEntrante:"/api-gimacpay_entrante.php/gimacTransaction",
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

    //apiUrl: 'https://192.168.40.200:8080/iSMS/rest/api/',
    //pk_stripe:"pk_test_w8oGrvYLvf7dH8Yto1BEJK9X",
    pk_stripe:"pk_live_WMbUGdkTHDbcAbYhkUhAJZPd",
    //pk_stripe:"pk_live_r1P5QXiVbPIiAlq5gUwOzeCv00HRtftzJx",
    clientidPaypalSandbox:"AfdZ-AgDqqq4nJwvkxAW9qPbCocA7P7LPFdJlR2ouMp7LZK9vnPtXunMChpcqQQo9O7y9URd8k1bvTVm",
    clientidPaypalProduction:"AROyfruqD-wi-XIaJFaam7DZHrl-AgUABEICwaj107yHB97jU_boULPFdwWoNEPCSNz8G8ZSbI3WBcSF",
    clientpaypal:"AS3FU5KqbPUXgjwFbC2aMTu3oQA8XfH7qoq6ThL81DwkeOL_z0V6G9VcRKNLjBrClfkWAd-TdR3Oj1mT",
    //clientidPaypalProduction:"AbxF_2WReHhxnNt7AxyOvb1kAYNHABFYcqCR7gHZawYtAQB50eRp5xtadU9YSIbfT5J_c5w1ifkdJ3Wp",
    //idClient:"22",
    //testUrl:'https://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/stripe_payment/',
    //testUrlpaypal:'https://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    
    //testInitializeOM:'https://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    
    //paypalPayement:'https://41.77.210.246:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    //testUrlmtnCredit:'https://192.168.40.200:8080/iSMS/rest/api/creditMobilePaiement/'

    //testInitializeOM:'https://sms.iplans.cm/rest/api/omTransactionInitialize/',
    //testTrStatusOM:'https://sms.iplans.cm/rest/api/getTransactionStatus/',
    paypalPayementperfectPay:'https://154.72.148.105:8081/Perfectpay/rest/api/paiement/checkPaypal?',

    /**
     * google
     */

    production: false,    
    //testInitializeOM:'https://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    //testTrStatusOM:'https://41.77.210.246:8080/iSMS/rest/api/getTransactionStatus/',
    //testTrStatusOM:'https://192.168.40.200:8080/iSMS/rest/api/getTransactionStatus/',
    //paypalPayement:'https://41.77.210.246:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    //testInitializeOM:'https://41.77.210.246:8080/iSMS/rest/api/omTransactionInitialize/'
    //testUrlmtnCredit:'https://192.168.40.200:8080/iSMS/rest/api/creditMobilePaiement/'
      


    
    //CREDIT PAIEMENT LIVE
    testTrStatusOM:'https://sms.iplans.cm/rest/api/getTransactionStatus/',
    testInitializeOM:'https://sms.iplans.cm/rest/api/omTransactionInitialize/',
    stripePayement:'https://sms.iplans.cm/rest/api/stripePaymentCredit/',
    mtnPayement:'https://sms.iplans.cm/rest/api/creditMobilePaiement',
    paypalPayement:'https://sms.iplans.cm/rest/api/verifyPaymentCredit/',    
    testUrlmtnCredit:'https://sms.iplans.cm/iSMS/rest/api/creditMobilePaiement/',
    stripePayementV2:'https://sms.iplans.cm/rest/api/stripePaymentCreditV2/', 
    mtnPayementV2:'https://sms.iplans.cm/rest/api/creditMobilePaiementV2',


    //SMS PAIEMENT LIVE
    packageSms:'https://sms.iplans.cm/rest/api/getAllPackage',
    paypalsmspay:'https://sms.iplans.cm/rest/api/verifyPaymentSms/',
    mtnsmspay: 'https://sms.iplans.cm/rest/api/smsMobilePaiement',
    stripesmspay:'https://sms.iplans.cm/rest/api/stripePaymentSMS/',
    soldePerfecttalk:'sms.iplans.cm/rest/api/getSoldeClient/',
    virementFondCarte:'https://sms.iplans.cm/rest/api/fundTransfertToCard/',
    virementFondCarteToCarte:'https://sms.iplans.cm/rest/api/fundTransfertCardToCard/',
    transfertArgent:'https://sms.iplans.cm/rest/api/transfertArgent/',
    getUserOperation:'https://sms.iplans.cm/rest/api/getUserOperation/',
    transfertCreditToMOMO:'https://sms.iplans.cm/rest/api/transfertCreditToMOMO/',
    setCustomerId:'https://sms.iplans.cm/rest/api/setCustomerId/',
    //CREDIT PAIEMENT LIVE
    set_devise :'https://sms.iplans.cm/rest/api/setDevise/',
    pendingPayment :'https://sms.iplans.cm/rest/payment/getPendingPayment/',
    validatePendingPayment :'https://sms.iplans.cm/rest/payment/validatePayment/'

    //SANDBOX TEST
    //testInitializeOM:'https://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    //testUrlmtnCredit:'https://192.168.40.200:8080/iSMS/rest/api/creditMobilePaiement/'
    //testInitializeOM:'https://192.168.40.200:8080/iSMS/rest/api/omTransactionInitialize/',
    //paypalPayement:'https://41.77.210.246:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
    //testInitializeOM:'https://sms.iplans.cm/rest/api/omTransactionInitialize/',
    //testTrStatusOM:'https://sms.iplans.cm/rest/api/getTransactionStatus/',
    //testUrl:'https://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/stripe_payment/',
    //testUrlpaypal:'https://192.168.40.210:8080/iplansPaypal/webresources/verify_payment/paypal_payment/',
};