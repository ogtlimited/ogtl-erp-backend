/* eslint-disable prettier/prettier */
export const account = [
    {
        account_name: "Application of Funds (Assets)",
        is_group: true,
        default: true,
        child: [
            {
                account_name: "Current Assets",
                is_group: true,
                default: true,
                child: [
                    {
                        account_name: "Accounts Receivable",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Bank Accounts",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Cash In Hand",
                        is_group: true,
                        default: true,
                    },
                    {
                        account_name: "Loan and Advances (Assets)",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Securities and Deposits",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Stock Assets",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Tax Assets",
                        is_group: true,

default: true,                    }
                ]
            },
            {
                account_name: "Fixed Assets",
                is_group: true,

default: true,            },
            {
                account_name: "Investments",
                is_group: true,

default: true,            },
            {
                account_name: "Temporary Accounts",
                is_group: true,

default: true,            }
        ]
    },
    {
        account_name: "Source of Funds (Liabilities)",
        is_group: true,
        default: true,
        child: [
            {
                account_name: "Current Liabilities",
                is_group: true,
                default: true,
                child: [
                    {
                        account_name: "Account Payable",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Duties and Taxes",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Loans (Liabilities)",
                        is_group: true,

default: true,                    },
                    {
                        account_name: "Stock Liabilities",
                        is_group: true,

default: true,                    }
                ]
            }
        ]
    },
    {
        account_name: "Equity",
        is_group: true,

default: true,    },
    {
        account_name: "Income",
        is_group: true,
        default: true,
        child: [
            {
                account_name: "Direct Income",
                is_group: true,

default: true,            },
            {
                account_name: "Indirect Income",
                is_group: true,
                default: true,
            }
        ]
    },
    {
        account_name: "Expenses",
        is_group: true,
        default: true,
        child: [
            {
                account_name: "Direct Expenses",
                is_group: true,
                default: true,
                child: [
                    {
                        account_name: "Stock Expenses",
                        is_group: true,

default: true,                    }
                ]
            },
            {
                account_name: "Indirect Expenses",
                is_group: true,
                default: true,
            }
        ]
    }
];