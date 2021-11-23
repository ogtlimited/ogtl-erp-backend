/* eslint-disable prettier/prettier */
export const account = [
    {
        account_name: "Application of Funds (Assets)",
        is_group: true,
        default: true,
        number_prefix: "0",
        child: [
            {
                account_name: "Current Asset",
                is_group: true,
                default: true,
                number_prefix: "2",
                child: [
                    {
                        account_name: "Account Receivable",
                        is_group: true,
                        default: true,
                        child: [
                            {
                                account_name: "Accounts-Receivable",
                                is_group: false,
                                default: true,
                                currency: "NGN",
                                is_default: true,
                                account_number: "3054300900",
                                balance: 0
                            }

                        ],
                        number_prefix: "1"                  
                    },
                    {
                        account_name: "Bank Accounts",
                        is_group: true,
                        default: true,
                        number_prefix: "0",                    
                    },
                    {
                        account_name: "Cash In Hand",
                        is_group: true,
                        default: true,
                        number_prefix: "3",
                        child: [
                            {
                                account_name: "Bank and Cash",
                                is_group: false,
                                default: true,
                                currency: "NGN",
                                is_default: true,
                                account_number: "3054300900",
                                balance: 0
                            }

                        ]
                    },
                    {
                        account_name: "Loan and Advances (Assets)",
                        is_group: true,
                        default: true,
                        number_prefix: "0",
                    },
                    {
                        account_name: "Securities and Deposits",
                        is_group: true,
                        default: true,
                        number_prefix: "0",
                    },
                    {
                        account_name: "Stock Assets",
                        is_group: true,
                        default: true,
                        number_prefix: "0",
                    },
                    {
                        account_name: "Tax Assets",
                        is_group: true,
                        default: true,
                        number_prefix: "0",
                    },
                    {
                        account_name: "Current Assets",
                        is_group: false,
                        default: true,
                        currency: "NGN",
                        is_default: true,
                        account_number: "3054300900",
                        balance: 0
                    },
                ]
            },
            {
                account_name: "Fixed Asset",
                is_group: true,
                default: true,
                number_prefix: "4",  
                child: [
                    {
                        account_name: "Fixed Assets",
                        is_group: false,
                        default: true,
                        currency: "NGN",
                        is_default: true,
                        account_number: "3054300900",
                        balance: 0
                    }
                ]
            },
            {
                account_name: "Investments",
                is_group: true,
                default: true,
                number_prefix: "0",
            },
            {
                account_name: "Temporary Accounts",
                is_group: true,
                default: true,
                number_prefix: "0",
            }
        ]
    },
    {
        account_name: "Source of Funds (Liabilities)",
        is_group: true,
        default: true,
        number_prefix: "0",
        child: [
            {
                account_name: "Current Liabilities",
                is_group: true,
                default: true,
                number_prefix: "0",
                child: [
                    {
                        account_name: "Account Payable",
                        is_group: true,
                        default: true,
                        number_prefix: "5",
                        child: [
                            {
                                account_name: "Accounts-Payable",
                                is_group: false,
                                default: true,
                                currency: "NGN",
                                is_default: true,
                                account_number: "3054300900",
                                balance: 0
                            }
                        ]   
                    },
                    {
                        account_name: "Duties and Taxes",
                        is_group: true,
                        default: true,
                        number_prefix: "0",
                    },
                    {
                        account_name: "Loans (Liabilities)",
                        is_group: true,
                        default: true,
                        number_prefix: "0",
                    },
                    {
                        account_name: "Stock Liabilities",
                        is_group: true, 
                        default: true,
                        number_prefix: "0",
                    },
                    {
                        account_name: "Current Liabilities",
                        is_group: false,
                        default: true,
                        currency: "NGN",
                        is_default: true,
                        account_number: "3054300900",
                        balance: 0
                    }
                ]
            }
        ]
    },
    {
        account_name: "Equity",
        is_group: true,
        default: true,
        number_prefix: "0",
    },
    {
        account_name: "Income",
        is_group: true,
        default: true,
        number_prefix: "0",
        child: [
            {
                account_name: "Direct Income",
                is_group: true,
                default: true,
                number_prefix: "0",
            },
            {
                account_name: "Indirect Income",
                is_group: true,
                default: true,
                number_prefix: "0",
            }
        ]
    },
    {
        account_name: "Expenses",
        is_group: true,
        default: true,
        number_prefix: "0",
        child: [
            {
                account_name: "Direct Expenses",
                is_group: true,
                default: true,
                number_prefix: "0",
                child: [
                    {
                        account_name: "Stock Expenses",
                        is_group: true,
                        default: true,
                        number_prefix: "0",
                    }
                ]
            },
            {
                account_name: "Indirect Expenses",
                is_group: true,
                default: true,
                number_prefix: "0",
            }
        ]
    }
];

