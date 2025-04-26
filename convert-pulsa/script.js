document.addEventListener('DOMContentLoaded', function() {
    // Provider data
    const convertRate = [
      {
        id: 1,
        provider: "Telkomsel",
        range: "50rb - dst",
        rate: "0.88",
        img: "/provider/telkomsel.png",
      },
      {
        id: 2,
        provider: "Axis & XL",
        range: "50rb - dst",
        rate: "0.90",
        img: "/provider/axis-xl.png",
      },
      {
        id: 3,
        provider: "Indosat",
        range: "50rb - 1jt",
        rate: "0.88",
        img: "/provider/indosat.png",
      },
      {
        id: 4,
        provider: "Tri",
        range: "50rb - 1jt",
        rate: "0.93",
        img: "/provider/tri.png",
      },
      {
        id: 5,
        provider: "Smartfren",
        range: "50rb - 1jt",
        rate: "0.87",
        img: "/provider/smartfren.png",
      },
    ];
  
    // Form data
    let formData = {
      provider: "",
      phoneNumber: "",
      nominal: "",
      bank: "",
      accountNumber: "",
      accountName: "",
      rate: "",
    };
  
    // DOM elements
    const providerStep = document.getElementById('provider-step');
    const bankStep = document.getElementById('bank-step');
    const confirmationStep = document.getElementById('confirmation-step');
    
    const providerSelect = document.getElementById('provider');
    const phoneNumberInput = document.getElementById('phone-number');
    const nominalInput = document.getElementById('nominal');
    const rateInfo = document.getElementById('rate-info');
    const rangeInfo = document.getElementById('range-info');
    const ratePercentage = document.getElementById('rate-percentage');
    const amountReceived = document.getElementById('amount-received');
    const amountValue = document.getElementById('amount-value');
    
    const bankSelect = document.getElementById('bank');
    const accountNumberInput = document.getElementById('account-number');
    const accountNameInput = document.getElementById('account-name');
    
    const nextToBankBtn = document.getElementById('next-to-bank');
    const backToProviderBtn = document.getElementById('back-to-provider');
    const nextToConfirmationBtn = document.getElementById('next-to-confirmation');
    const backToBankBtn = document.getElementById('back-to-bank');
    const convertNowBtn = document.getElementById('convert-now');
    const convertWhatsappBtn = document.getElementById('convert-whatsapp');
    
    // Summary elements
    const summaryProvider = document.getElementById('summary-provider');
    const summaryPhone = document.getElementById('summary-phone');
    const summaryNominal = document.getElementById('summary-nominal');
    const summaryRate = document.getElementById('summary-rate');
    const summaryAmount = document.getElementById('summary-amount');
    
    // Confirmation elements
    const confirmPhone = document.getElementById('confirm-phone');
    const confirmNominal = document.getElementById('confirm-nominal');
    const confirmRate = document.getElementById('confirm-rate');
    const confirmAmount = document.getElementById('confirm-amount');
    const confirmBank = document.getElementById('confirm-bank');
    const confirmAccountNumber = document.getElementById('confirm-account-number');
    const confirmAccountName = document.getElementById('confirm-account-name');
    
    // Initialize provider options
    function initProviderOptions() {
      convertRate.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider.provider;
        option.textContent = provider.provider;
        providerSelect.appendChild(option);
      });
    }
    
    // Calculate amount received
    function calculateAmountReceived() {
      if (!formData.nominal || !formData.rate) return 0;
      const nominal = parseFloat(formData.nominal);
      const rate = parseFloat(formData.rate);
      return Math.floor(nominal * rate);
    }
    
    // Format number with thousands separator
    function formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    // Update amount received display
    function updateAmountReceived() {
      const amount = calculateAmountReceived();
      amountValue.textContent = `Rp${formatNumber(amount)}`;
      
      if (amount > 0) {
        amountReceived.classList.remove('hidden');
      } else {
        amountReceived.classList.add('hidden');
      }
    }
    
    // Update rate info display
    function updateRateInfo() {
      if (formData.provider) {
        const selectedProvider = convertRate.find(p => p.provider === formData.provider);
        if (selectedProvider) {
          rangeInfo.textContent = `Range: ${selectedProvider.range}`;
          ratePercentage.textContent = `Rate: ${parseFloat(selectedProvider.rate) * 100}%`;
          rateInfo.classList.remove('hidden');
        }
      } else {
        rateInfo.classList.add('hidden');
      }
    }
    
    // Update summary in bank step
    function updateBankSummary() {
      summaryProvider.textContent = formData.provider;
      summaryPhone.textContent = formData.phoneNumber;
      summaryNominal.textContent = `Rp ${formatNumber(Number(formData.nominal))}`;
      summaryRate.textContent = `${parseFloat(formData.rate) * 100}%`;
      summaryAmount.textContent = `Rp ${formatNumber(calculateAmountReceived())}`;
    }
    
    // Update confirmation details
    function updateConfirmationDetails() {
      confirmPhone.textContent = formData.phoneNumber;
      confirmNominal.textContent = formData.nominal;
      confirmRate.textContent = `${parseFloat(formData.rate) * 100}%`;
      confirmAmount.textContent = `Rp ${formatNumber(calculateAmountReceived())}`;
      confirmBank.textContent = formData.bank.toUpperCase();
      confirmAccountNumber.textContent = formData.accountNumber;
      confirmAccountName.textContent = formData.accountName;
    }
    
    // Check if bank form is valid
    function isBankFormValid() {
      return formData.bank && formData.accountNumber && formData.accountName;
    }
    
    // Update next button state
    function updateNextButtonState() {
      nextToConfirmationBtn.disabled = !isBankFormValid();
    }
    
    // Navigate to step
    function goToStep(step) {
      providerStep.classList.remove('active');
      bankStep.classList.remove('active');
      confirmationStep.classList.remove('active');
      
      if (step === 'provider') {
        providerStep.classList.add('active');
      } else if (step === 'bank') {
        updateBankSummary();
        bankStep.classList.add('active');
      } else if (step === 'confirmation') {
        updateConfirmationDetails();
        confirmationStep.classList.add('active');
      }
    }
    
    // Generate WhatsApp URL
    function generateWhatsAppUrl() {
      const whatsappNumber = "6285751728931";
      const message = `Nominal Pulsa : ${formData.nominal}
Provider : ${formData.provider}
No Pengirim Pulsa : ${formData.phoneNumber}
Bank / Dompet Digital : ${formData.bank.toUpperCase()}
No Rekening : ${formData.accountNumber}
Atas Nama : ${formData.accountName}
Rate : ${parseFloat(formData.rate) * 100}%
Jumlah yang diterima : Rp ${formatNumber(calculateAmountReceived())}`;
      
      return `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    }
    
    // Event listeners
    providerSelect.addEventListener('change', function(e) {
      formData.provider = e.target.value;
      const selectedProvider = convertRate.find(p => p.provider === formData.provider);
      if (selectedProvider) {
        formData.rate = selectedProvider.rate;
      }
      updateRateInfo();
      updateAmountReceived();
    });
    
    phoneNumberInput.addEventListener('input', function(e) {
      formData.phoneNumber = e.target.value;
      updateAmountReceived();
    });
    
    nominalInput.addEventListener('input', function(e) {
      formData.nominal = e.target.value;
      updateAmountReceived();
    });
    
    bankSelect.addEventListener('change', function(e) {
      formData.bank = e.target.value;
      updateNextButtonState();
    });
    
    accountNumberInput.addEventListener('input', function(e) {
      formData.accountNumber = e.target.value;
      updateNextButtonState();
    });
    
    accountNameInput.addEventListener('input', function(e) {
      formData.accountName = e.target.value;
      updateNextButtonState();
    });
    
    nextToBankBtn.addEventListener('click', function() {
      if (formData.provider && formData.phoneNumber && formData.nominal) {
        goToStep('bank');
      } else {
        alert('Mohon lengkapi semua data provider terlebih dahulu.');
      }
    });
    
    backToProviderBtn.addEventListener('click', function() {
      goToStep('provider');
    });
    
    nextToConfirmationBtn.addEventListener('click', function() {
      if (isBankFormValid()) {
        goToStep('confirmation');
      }
    });
    
    backToBankBtn.addEventListener('click', function() {
      goToStep('bank');
    });
    
    convertWhatsappBtn.addEventListener('click', function() {
      const termsChecked = document.getElementById('terms').checked;
      if (termsChecked) {
        const url = generateWhatsAppUrl();
        window.open(url, '_blank');
      } else {
        alert('Mohon setujui syarat dan ketentuan terlebih dahulu.');
      }
    });
    
    // Initialize
    initProviderOptions();
    updateNextButtonState();
  });