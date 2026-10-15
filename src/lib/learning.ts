import { Landmark, ChartNoAxesColumnIncreasing, Boxes, TrendingUp, Wallet, BookOpen, Layers, Repeat, Sprout, ShieldCheck } from 'lucide-react';

export const investments = [
  { id:'fd', name:'Fixed Deposits (FD)', icon:Landmark, tone:'green', risk:'Low Risk', short:'A simple and safe option with fixed returns.', simple:'An FD is money you leave with a bank for a set time. The bank agrees to pay you a fixed interest rate. It is predictable, but your money is less flexible than in a savings account.', example:'If you put ₹10,000 in a one-year FD at 6%, you would receive about ₹10,600 before tax. The rate and interest calculation depend on your bank.', deeper:'The rate is agreed when you open the deposit. Bank deposits in India are insured by DICGC up to ₹5 lakh per depositor per bank, including principal and interest, subject to eligibility. Corporate deposits do not have this protection.', limitations:'Withdrawing early may mean a penalty or reduced interest. Returns may not keep up with inflation.', liquidity:'Usually available early with a penalty. Check the specific deposit terms.', fees:'Early withdrawal penalties may apply. Interest is taxable.', question:'Is every deposit protected without a limit?', answers:['Yes, any amount is protected','No, protection has limits and conditions'], correct:1 },
  { id:'index', name:'Index Funds', icon:ChartNoAxesColumnIncreasing, tone:'blue', risk:'Moderate Risk', short:'Invest in a basket of top companies. Great for long-term growth.', simple:'An index fund buys a basket of investments that follows an index, such as the Nifty 50. Instead of choosing one company, you own a small part of many.', example:'If one company in your basket falls, the other companies may soften the impact. But if the whole market falls, your index fund can fall too.', deeper:'Index funds follow an index rather than trying to beat it. They can diversify company risk, but still carry market risk. Equity index funds can have large short-term losses; “moderate” is only a relative comparison to individual stocks here.', limitations:'Returns are not fixed. You can lose money, even in a diversified fund. Often more appropriate for goals at least 5–7 years away.', liquidity:'Open-ended funds usually allow redemption on business days. Settlement is not instant.', fees:'Expense ratio, possible exit loads and capital-gains taxes. Tracking error can affect returns.', question:'Can a diversified index fund lose value?', answers:['Yes, the whole market can fall','No, diversification guarantees safety'], correct:0 },
  { id:'gold', name:'Gold', icon:Boxes, tone:'gold', risk:'Moderate Risk', short:'A traditional option to diversify your portfolio.', simple:'Gold is a precious metal people use as a store of value. Its price moves up and down. It can add variety to a portfolio, but is not a guaranteed safe return.', example:'If you buy gold worth ₹10,000 and its price falls 10%, its market value becomes ₹9,000, before charges.', deeper:'Physical gold and gold ETFs are different products. ETFs track gold prices without storing gold at home. Gold does not produce company profits or regular income.', limitations:'Prices fluctuate. Jewellery making charges may not be recovered when selling. Storage and purity matter for physical gold.', liquidity:'Physical gold depends on finding a buyer. ETFs trade during exchange hours and require a demat account.', fees:'Making charges, buy/sell spreads, ETF expenses, possible brokerage and taxes.', question:'Does gold always rise in price?', answers:['Yes, gold cannot lose value','No, its market price fluctuates'], correct:1 },
  { id:'stocks', name:'Stocks', icon:TrendingUp, tone:'red', risk:'Higher Risk', short:'Own a part of a company. Higher potential, higher risk.', simple:'A stock is a small ownership share of a company. Its value changes as people buy and sell, and as expectations about the business change.', example:'If you buy a share at ₹100 and its price falls to ₹75, you have a 25% unrealized loss. Selling would make that loss realized.', deeper:'Single companies can perform very differently from the wider market. A share price can fall substantially or even become worthless. Dividends are not guaranteed.', limitations:'High company-specific and market risk. Needs research, diversification and a long-term perspective. This is learning content, not a stock recommendation.', liquidity:'Listed stocks can be sold during market hours when a buyer exists. Settlement and liquidity vary.', fees:'Brokerage, exchange charges, stamp duty, taxes and other transaction fees.', question:'What does owning a share mean?', answers:['Owning a small part of a company','Lending money with a guaranteed return'], correct:0 },
  { id:'savings', name:'Savings Accounts', icon:Wallet, tone:'green', risk:'Lower Risk', short:'Keep everyday money and emergency savings accessible.', simple:'A savings account holds money at a bank. You can generally access it when you need it and may earn a small amount of interest.', example:'Emergency savings can cover an unexpected bill without forcing you to sell investments during a market fall.', deeper:'Interest rates vary and can change. Eligible deposits have DICGC cover up to ₹5 lakh per depositor per bank, including interest.', limitations:'Lower returns may not match inflation.', liquidity:'Usually accessible, subject to bank withdrawal limits.', fees:'Minimum-balance, service charges and taxes may apply.', question:'Where is emergency money usually most accessible?', answers:['A locked long-term investment','An accessible savings account'], correct:1 },
  { id:'bonds', name:'Bonds', icon:ShieldCheck, tone:'blue', risk:'Varies by issuer', short:'Lend money to a government or company for interest.', simple:'A bond is a loan you make to a government or business. It promises interest and repayment, but the promise depends on the issuer’s ability to pay.', example:'A ₹10,000 bond with a 7% annual coupon pays ₹700 a year if the issuer meets its obligations. Its resale price may change.', deeper:'Bond prices generally fall when interest rates rise. Credit quality, maturity and product terms matter. Not all bonds are equally safe.', limitations:'Issuer default, interest-rate and liquidity risk. Government and corporate bonds have different risk profiles.', liquidity:'May be hard to sell before maturity. Market liquidity varies.', fees:'Brokerage, spreads and taxes; bond funds have expense ratios.', question:'Are all bonds equally safe?', answers:['No, issuer and terms matter','Yes, all bonds guarantee repayment'], correct:0 },
];

export type Investment = (typeof investments)[number];

export type LessonSection = {
  heading: string;
  body: string;
};

export type Lesson = {
  title: string;
  subtitle: string;
  readTime: string;
  icon: typeof Wallet;
  text: string;
  sections: LessonSection[];
  example: {
    title: string;
    scenario: string;
    takeaway: string;
  };
  pitfalls: string[];
  goldenRule: string;
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
};

export const lessons: Lesson[] = [
  {
    title: 'Saving vs. investing',
    subtitle: 'Understanding the difference between capital protection and wealth creation',
    readTime: '3 min read',
    icon: Wallet,
    text: 'Saving keeps money available for near-term needs. Investing puts money into assets for potential future growth, with the possibility of loss. Start with an emergency cushion before taking investment risk.',
    sections: [
      {
        heading: 'Two Different Jobs for Your Money',
        body: 'Saving is about capital preservation and immediate safety. It is the money you keep in a savings account, recurring deposit, or liquid fund for short-term needs (rent, bills, tuition, medical emergencies) over the next 1 to 3 years. Investing is about capital growth and purchasing power expansion—putting money into productive assets (index funds, mutual funds, equities) to beat inflation over 5, 10, or 20 years.'
      },
      {
        heading: 'Why Saving Alone Guarantees a Slow Loss',
        body: 'When inflation in India averages 5% to 7% per year, the cost of groceries, travel, and healthcare steadily climbs. If your money sits in a standard savings account earning 3% to 3.5%, your real purchasing power erodes every single year. You may see the same or slightly higher numbers in your passbook, but that money buys significantly less. To preserve your standard of living, investing is mandatory.'
      },
      {
        heading: 'The Three-Step Financial Order',
        body: '1. Debt Management: Pay off high-cost personal loans and credit cards first.\n2. Emergency Buffer: Set aside 3 to 6 months of living expenses in an accessible savings or liquid account (eligible bank deposits are insured up to ₹5 lakh by DICGC).\n3. Long-Term Wealth: Channel your recurring monthly surplus into disciplined, diversified investments.'
      }
    ],
    example: {
      title: 'Aarav’s 10-Year Comparison (₹5,000/month)',
      scenario: 'Suppose Aarav saves ₹5,000 every month for 10 years (total deposited: ₹6,00,000). In a basic savings account at 3.5%, his total grows to ~₹7.2 lakh, which after inflation buys less than when he started. If instead he kept a 3-month buffer and invested ₹5,000/month in a diversified index fund earning an illustrative 12% CAGR, his balance would grow to ~₹11.6 lakh—delivering over ₹4.4 lakh in additional real wealth.',
      takeaway: 'Emergency savings protect you today; long-term investing buys your independence tomorrow.'
    },
    pitfalls: [
      'Investing your emergency fund into volatile stocks or crypto and being forced to sell at a loss when rent is due.',
      'Leaving your entire life savings in a low-interest bank account for 10+ years, allowing inflation to silently devour it.',
      'Waiting until you have a "large amount" to start, instead of beginning with as little as ₹500/month.'
    ],
    goldenRule: 'Save for security today; invest for abundance tomorrow. Never invest money you cannot afford to leave untouched for at least 5 years.',
    quiz: {
      question: 'Why should you build a 3–6 month emergency fund before investing in stocks or mutual funds?',
      options: [
        'To avoid being forced to sell investments at a loss when unexpected life expenses arise',
        'Because savings accounts always yield higher returns than equity index funds',
        'Because SEBI regulations make investing illegal without an emergency fund'
      ],
      correct: 0,
      explanation: 'An emergency fund is your financial seatbelt. It ensures emergencies do not force you to sell long-term investments during market crashes.'
    }
  },
  {
    title: 'How the stock market works',
    subtitle: 'Demystifying share prices, exchanges, and what actually moves the market',
    readTime: '4 min read',
    icon: TrendingUp,
    text: 'A stock exchange is a marketplace where investors buy and sell company shares. Prices move with demand, business results and expectations. A rising market does not guarantee your investment will grow.',
    sections: [
      {
        heading: 'What You Truly Own When You Buy a Stock',
        body: 'A share is not a lottery ticket or an abstract chart; it is fractional legal ownership in a real operating business. When you own shares in companies like Tata Motors, Infosys, or HDFC Bank, you hold an economic interest in their factories, software, stores, and future profits. When those businesses earn more, your share of that business grows.'
      },
      {
        heading: 'The Exchange & The Order Book',
        body: 'In India, the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) serve as electronic matching platforms. Every second, buyers (who want lower prices) and sellers (who want higher prices) place orders. When prices match, a trade happens. Share prices fluctuate continuously during market hours based on collective investor expectations, corporate earnings, interest rates, and global events.'
      },
      {
        heading: 'Voting Machine vs. Weighing Machine',
        body: 'Legendary investor Benjamin Graham famously observed: "In the short run, the market is a voting machine (driven by emotions, fear, and hype); in the long run, it is a weighing machine (driven by actual company earnings)." Day-to-day stock price jumps and drops are normal market breathing. Sustained wealth comes from companies that consistently grow their profits over 5 to 10 years.'
      }
    ],
    example: {
      title: 'The Coffee Shop Analogy',
      scenario: 'Imagine a successful neighborhood cafe with 10 equal partners that makes ₹10 lakh profit per year (₹1 lakh per partner). If the cafe expands to 20 profitable locations across the city and profits grow to ₹2 crore, each partner’s 10% share now yields ₹20 lakh a year! Investors are willing to pay far more to buy out a partner. That is why share prices appreciate over time—real business expansion drives valuation.',
      takeaway: 'Invest in businesses whose products and services you understand and believe will be more valuable a decade from now.'
    },
    pitfalls: [
      'Treating the stock market like a casino through speculative intra-day trading, F&O options, and unverified social media tips.',
      'Panic-selling great businesses during temporary economic downturns or global news panics.',
      'Assuming that a falling stock price automatically means a company is cheap (some declining businesses never recover).'
    ],
    goldenRule: 'Behind every stock ticker is a real business. If the business flourishes, the stock eventually follows. If the business fails, the stock fails.',
    quiz: {
      question: 'What fundamentally drives the long-term price appreciation of a stock over 5 to 10 years?',
      options: [
        'The company’s revenue growth, net profits, and competitive advantages',
        'Daily rumors, chat groups, and short-term speculative hype',
        'The overall color scheme and logo design of the stock exchange app'
      ],
      correct: 0,
      explanation: 'While daily price movements are driven by market sentiment and news, long-term share prices closely track the company’s underlying earnings power.'
    }
  },
  {
    title: 'Mutual funds, made simple',
    subtitle: 'Instant diversification and professional management with as little as ₹500',
    readTime: '3 min read',
    icon: Layers,
    text: 'A mutual fund pools money from many people and invests it according to a stated strategy. You own units in that pool. Equity, debt and hybrid funds have different risks, charges and objectives.',
    sections: [
      {
        heading: 'The Power of the Basket',
        body: 'Building and managing a diversified basket of 50 individual stocks requires lakhs of rupees, deep financial analysis, and constant tracking of quarterly corporate filings. A mutual fund solves this problem: thousands of retail investors pool their money together, and an Asset Management Company (AMC) registered with SEBI invests that capital according to a defined objective.'
      },
      {
        heading: 'The Three Main Categories',
        body: '1. Equity Funds: Invest primarily in company stocks. Tailored for wealth creation over 5+ years. Includes broad Index Funds (Nifty 50), Large Cap, Mid Cap, and Flexi Cap funds.\n2. Debt Funds: Invest in government treasury bills, commercial paper, and corporate bonds. Tailored for stability, capital protection, and 1–3 year horizons.\n3. Hybrid Funds: Automatically balance both equities and debt to provide moderate growth with reduced volatility.'
      },
      {
        heading: 'Direct Plans vs. Regular Plans',
        body: 'Every mutual fund has two variants: Direct and Regular. Regular plans pay hidden annual commissions (0.5% to 1.5%) to distributors and brokers from your fund balance. Direct plans have no distributor commissions and significantly lower Total Expense Ratios (TER). Choosing Direct-Growth plans can put 15% to 25% more money in your pocket over a 20-year investing journey!'
      }
    ],
    example: {
      title: 'The ₹500 Diversification Miracle',
      scenario: 'With ₹500, you cannot buy a single share of MRF (trading above ₹1,30,000) or even a share of many large-cap leaders. But by putting ₹500 into a Nifty 50 Index Mutual Fund, you instantly purchase fractional ownership in India’s top 50 blue-chip companies—including Reliance, TCS, HDFC Bank, Infosys, and ITC. If two companies have a tough year, the other 48 keep your money growing.',
      takeaway: 'Mutual funds eliminate company-specific collapse risk through broad diversification.'
    },
    pitfalls: [
      'Buying "Regular" plans through banks or middlemen instead of "Direct" plans on modern platforms, losing lakhs in lifetime commissions.',
      'Holding 15 to 20 different mutual funds that all buy the exact same top 30 companies (portfolio clutter).',
      'Exiting equity mutual funds after 6 months because the market had a temporary 5% correction.'
    ],
    goldenRule: 'Always choose Direct-Growth mutual funds. Keep your portfolio streamlined with 2 to 4 well-chosen funds matching your target timeline.',
    quiz: {
      question: 'What is the main benefit of choosing a "Direct" mutual fund plan over a "Regular" plan?',
      options: [
        'Direct plans have lower expense ratios because no middleman commissions are deducted from your money',
        'Direct plans guarantee you will never suffer a market loss',
        'Direct plans invest in confidential government-only companies'
      ],
      correct: 0,
      explanation: 'Direct plans bypass intermediary commissions. That lower cost compounds directly into higher returns for you over the long term.'
    }
  },
  {
    title: 'What is an SIP?',
    subtitle: 'How automated monthly investing beats market timing every single time',
    readTime: '4 min read',
    icon: Repeat,
    text: 'A systematic investment plan is a way to contribute a fixed amount regularly to a mutual fund. An SIP is not a separate investment product. Investing regularly builds a habit, but does not guarantee profits or prevent losses.',
    sections: [
      {
        heading: 'An SIP Is a Method, Not a Product',
        body: 'A common beginner question is: "Should I invest in Mutual Funds OR an SIP?" An SIP (Systematic Investment Plan) is simply the payment method—like an automatic monthly subscription—that debits a set amount from your bank account and buys units of your chosen mutual fund. It replaces emotional decision-making with effortless automation.'
      },
      {
        heading: 'Rupee-Cost Averaging: Market Dips Become Your Friend',
        body: 'When the market is high and expensive, your fixed monthly ₹5,000 buys fewer mutual fund units. When the market drops or crashes, your ₹5,000 automatically buys MORE units at bargain prices! Over years of ups and downs, this mathematically lowers your average purchase price per unit. You never need to predict whether the market will go up or down tomorrow.'
      },
      {
        heading: 'The Superpower: Step-Up SIP',
        body: 'As your income or allowance grows, increasing your monthly SIP by just 10% each year (e.g., ₹5,000/month in Year 1, ₹5,500/month in Year 2, ₹6,050/month in Year 3) works miracles. A 10% annual step-up can cut your time to reach ₹10 lakh or ₹1 crore almost in half compared to a fixed SIP!'
      }
    ],
    example: {
      title: 'Priya’s Market Rollercoaster (₹5,000/month)',
      scenario: 'Priya starts a ₹5,000 monthly SIP. Month 1: NAV is ₹100 (she receives 50 units). Month 2: The market crashes 20%, NAV drops to ₹80 (she receives 62.5 units!). Month 3: Market rebounds to ₹110 (she receives 45.45 units). Total invested: ₹15,000. Total units collected: 157.95 units. Current portfolio value at ₹110 NAV = ₹17,374.50. Despite the 20% crash, Priya ended up with a +15.8% gain thanks to rupee-cost averaging!',
      takeaway: 'Never stop your SIP during a market crash; that is when units are on sale.'
    },
    pitfalls: [
      'Stopping or pausing your SIP during market crashes—the exact moment when you should be accumulating the cheapest units.',
      'Setting an unrealistic initial SIP amount that exhausts your living budget, forcing you to stop after 2 months.',
      'Checking your SIP portfolio every day and stressing over short-term paper fluctuations.'
    ],
    goldenRule: 'Schedule your SIP auto-debit for 2 to 3 days after salary day. Automate it, treat it like an essential bill, and let compounding do the work.',
    quiz: {
      question: 'How does an active monthly SIP turn market downturns into an advantage?',
      options: [
        'By automatically purchasing more mutual fund units at discounted prices with the same fixed monthly amount',
        'By pausing your investments until the market reaches an all-time high',
        'By converting your losses into tax-free government refunds'
      ],
      correct: 0,
      explanation: 'Rupee-cost averaging automatically acquires more units when prices fall, lowering your average cost per unit and boosting returns upon market recovery.'
    }
  },
  {
    title: 'Compounding & inflation',
    subtitle: 'The snowball effect that multiplies money vs. the hidden tax that erodes it',
    readTime: '4 min read',
    icon: Sprout,
    text: 'Compounding means returns may earn further returns over time. Inflation means prices rise and the same amount of money buys less. Both matter when planning a long-term goal. Investment growth is uncertain; fees and taxes reduce what you keep.',
    sections: [
      {
        heading: 'The Compounding Snowball',
        body: 'Simple interest only pays returns on your original deposit. Compound interest pays returns on your principal PLUS on all previously earned returns. In Years 1 to 5, the compounding curve looks modest and slow because your contributions do the heavy lifting. But between Years 10 and 20, the curve bends vertically: your accumulated returns begin generating more money each month than your actual salary!'
      },
      {
        heading: 'Inflation: The Invisible Thief',
        body: 'Inflation is the persistent rise in the price of everyday goods and services. At 6% inflation, prices double roughly every 12 years. If a cup of coffee costs ₹50 today, it will cost ₹100 in 12 years and ₹200 in 24 years. If you leave ₹10 lakh in physical cash or a 3% account, you are guaranteed to lose half its real purchasing power in 15 years.'
      },
      {
        heading: 'The Real Return Equation',
        body: 'Real Return = Nominal Investment Return − Inflation − Taxes.\nIf a fixed deposit pays 6.5%, inflation is 6%, and you pay 20% tax on the interest, your real return is actually negative! To truly build generational wealth, your capital must be invested in productive growth assets (like equities and index funds) that historically deliver 10% to 12%+, yielding real positive growth above inflation.'
      }
    ],
    example: {
      title: 'The Tale of Two Savers: Early vs. Late',
      scenario: 'Neha starts investing ₹5,000/month at age 20 and stops at age 30 (investing ₹6 lakh total over 10 years). She leaves that money invested until age 60 at 12% CAGR. Rohan waits until age 30, then invests ₹5,000/month continuously for 30 years until age 60 (investing ₹18 lakh total). At age 60, Neha has ~₹1.80 crore, while Rohan has ~₹1.76 crore! Neha invested 3 times LESS money, but her 10-year head start allowed compounding to run for 40 years.',
      takeaway: 'Time in the market is vastly more powerful than the amount of money you invest.'
    },
    pitfalls: [
      'Interrupting compounding by cashing out your investments every 2 to 3 years for impulsive lifestyle upgrades.',
      'Delaying your investing journey because you think your current income is too small to make a difference.',
      'Focusing only on nominal returns without subtracting inflation and taxes.'
    ],
    goldenRule: 'Your greatest financial asset in your twenties is not your income—it is your time horizon. Start early, stay invested, and never interrupt compounding unnecessarily.',
    quiz: {
      question: 'If your investment returns 7% per year, but inflation is 6% and taxes consume 1%, what is your real purchasing power growth?',
      options: [
        '0% (Your money merely kept pace with rising living costs, producing no real wealth expansion)',
        '7% (You earn the entire gross return without deduction)',
        '13% (Inflation is added on top of your returns)'
      ],
      correct: 0,
      explanation: 'Real Return = 7% - 6% inflation - 1% taxes = 0%. You need assets that outpace inflation to build real purchasing power.'
    }
  },
  {
    title: 'Understanding risk',
    subtitle: 'Why risk is not gambling, and how asset allocation turns volatility into opportunity',
    readTime: '4 min read',
    icon: BookOpen,
    text: 'Risk means your actual outcome may differ from what you expect, including losing money. Diversification reduces dependence on one asset, but cannot remove all risk. Match investments to when you need the money and how much loss you can tolerate.',
    sections: [
      {
        heading: 'Risk vs. Gambling: The Vital Distinction',
        body: 'Gambling is taking uncalculated risk where the house has the statistical edge and zero value is produced (casinos, betting apps, lottery). Investing is deploying capital into productive enterprises that manufacture products, deliver services, innovate technology, and create economic surplus. Over long multi-year horizons, the productive economy trends upward.'
      },
      {
        heading: 'The Four Faces of Financial Risk',
        body: '1. Volatility Risk: Short-term price swings up and down. Normal, expected, and temporary for broad index funds.\n2. Inflation Risk: The certainty of losing purchasing power in low-yield cash and FDs.\n3. Default Risk: A company or borrower goes bankrupt and cannot repay your capital.\n4. Concentration Risk: Putting too much money into a single company stock, sector, or trendy crypto asset.'
      },
      {
        heading: 'Asset Allocation: Your Portfolio Seatbelt',
        body: 'Asset allocation is how you split your money among three core buckets: Equity (growth engine for beating inflation), Debt/Fixed Income (shock absorber for emergency stability), and Gold (crisis hedge against geopolitical turmoil). Studies show that over 90% of your long-term returns and emotional calm come from your asset allocation, not stock picking.'
      }
    ],
    example: {
      title: 'The Crash Test: Concentrated vs. Balanced',
      scenario: 'In March 2020, global markets crashed ~38% during the pandemic outbreak. Investor A had 100% of their savings in speculative small-cap stocks; their portfolio cratered 55%, and they panic-sold at the bottom. Investor B had a balanced 60/30/10 allocation (60% broad index fund, 30% debt/FD, 10% gold); their total portfolio dropped only ~16%, their gold rose, and their debt gave them the peace of mind to hold steady through the recovery.',
      takeaway: 'Asset allocation protects you from your own panic during inevitable market storms.'
    },
    pitfalls: [
      'Confusing temporary volatility (paper price swings) with permanent loss of capital.',
      'Failing to diversify and putting all your money into a single trending stock or crypto token.',
      'Panic-selling at the bottom of a market drop, turning temporary paper losses into permanent real losses.'
    ],
    goldenRule: 'Never take equity risk with money you will need in the next 3 years. For money you will not need for 7+ years, avoiding equity risk IS the biggest risk of all.',
    quiz: {
      question: 'Which of the following strategies is the most effective way to manage investment risk for a beginner?',
      options: [
        'Spreading money across diverse asset classes (index funds, debt, gold) matched to your timeline',
        'Attempting to predict the exact day the market will crash and keeping all money in cash',
        'Borrowing money to double down on a single volatile stock'
      ],
      correct: 0,
      explanation: 'Diversification and asset allocation ensure that a downturn in one asset does not ruin your entire portfolio, keeping you on track toward your long-term goals.'
    }
  }
];