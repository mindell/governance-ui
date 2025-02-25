import useGovernanceAssets from '@hooks/useGovernanceAssets'
import { getTreasuryAccountItemInfoV2 } from '@utils/treasuryTools'
import React from 'react'
import AccountItem from './AccountItem'

const AccountsItems = () => {
  const { governedTokenAccountsWithoutNfts } = useGovernanceAssets()
  const accountsSorted = governedTokenAccountsWithoutNfts.sort((a, b) => {
    const infoA = getTreasuryAccountItemInfoV2(a)
    const infoB = getTreasuryAccountItemInfoV2(b)
    return infoB.totalPrice - infoA.totalPrice
  })
  return (
    <div className="space-y-3">
      {accountsSorted.map((account) => {
        return (
          <AccountItem
            governedAccountTokenAccount={account}
            key={account?.extensions.transferAddress?.toBase58()}
          />
        )
      })}
    </div>
  )
}

export default AccountsItems
