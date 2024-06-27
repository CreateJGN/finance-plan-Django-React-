import "./savings.styles.jsx"
import { SavingsContainer, SavingsSummaryContainer } from "./savings.styles.jsx"
import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context.js"
import Summary from "../summary/summary.component.jsx"
import AccountInfo from "../account-info/account-info.component.jsx"
import SummaryGraphSavingsAccount from "../summary-graph/summary-graph.component.jsx"
import SummaryTableSavingsAccount from "../summary-table-savings-account/summary-table-savings-account.component.jsx"
import UpdateAccountForm from "../update-account-form/update-account-form.component.jsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js"
import { AccordionTransition } from "../../../shared/mui/accordion/accordion.component.jsx"
import { useContext } from "react"

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const Savings = () => {
  const { savingsAccounts } = useContext(SavingsContext)

  return (
    <SavingsContainer>
      {
        savingsAccounts.map((savingsAccount, index) => {
          return (
            <AccordionTransition key={ index } header={ savingsAccount.savingsAccountName }
              styles={ accordionStyles }>
              <SavingsSummaryContainer>
                <Summary financeItemInfo={ savingsAccount }></Summary>
                <AccountInfo financeItemInfo={ savingsAccount }></AccountInfo>
              </SavingsSummaryContainer>

              <SummaryGraphSavingsAccount financeItemInfo={ savingsAccount }></SummaryGraphSavingsAccount>
              <SummaryTableSavingsAccount financeItemInfo={ savingsAccount }></SummaryTableSavingsAccount>
              <UpdateAccountForm financeItemInfo={ savingsAccount }></UpdateAccountForm>
            </AccordionTransition>
          )
        })
      }
    </SavingsContainer>
  )
}

export default Savings