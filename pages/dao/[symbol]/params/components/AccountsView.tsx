import { getTreasuryAccountItemInfoV2 } from '@utils/treasuryTools'
import { AccountType } from '@utils/uiTypes/assets'
import { AddressField } from '../index'
import useGovernanceAssets from '@hooks/useGovernanceAssets'

const AccountsView = ({ activeGovernance, getYesNoString }) => {
  const { assetAccounts } = useGovernanceAssets()
  return (
    <div className="space-y-3">
      {assetAccounts
        .filter(
          (x) =>
            x.governance.pubkey.toBase58() ===
            activeGovernance.pubkey.toBase58()
        )
        .map((x) => {
          const info = getTreasuryAccountItemInfoV2(x)
          if (x.isToken || x.isSol) {
            return (
              <div
                className="bg-bkg-1 p-4 pb-2 rounded-md"
                key={x.pubkey.toBase58()}
              >
                <AddressField bg={false} label="Name" val={info.name} />
                <AddressField
                  bg={false}
                  label="Address"
                  val={x.extensions?.transferAddress?.toBase58()}
                />
                <AddressField
                  bg={false}
                  label="Balance"
                  val={
                    <div className="flex items-center">
                      {info.logo && (
                        <img className="h-4 mr-1 w-4" src={info.logo} />
                      )}
                      <span>{`${info.amountFormatted} ${
                        info.info?.symbol && info.info?.symbol
                      }`}</span>
                    </div>
                  }
                />
                <AddressField
                  bg={false}
                  label="Type"
                  val={AccountType[x.type]}
                />
                {x.type !== AccountType.SOL && (
                  <AddressField
                    label="Mint"
                    bg={false}
                    val={x.extensions.mint?.publicKey.toBase58()}
                  />
                )}
              </div>
            )
          }

          if (x.type === AccountType.NFT) {
            return (
              <div
                className="bg-bkg-1 p-4 pb-2 rounded-md"
                key={x.pubkey.toBase58()}
              >
                <AddressField
                  bg={false}
                  label="Type"
                  val={AccountType[x.type]}
                />
                <AddressField
                  bg={false}
                  label="Address"
                  val={x.extensions?.transferAddress?.toBase58()}
                />
              </div>
            )
          }
          if (x.type === AccountType.MINT) {
            return (
              <div
                className="bg-bkg-1 p-4 pb-2 rounded-md"
                key={x.pubkey.toBase58()}
              >
                <AddressField
                  bg={false}
                  label="Type"
                  val={AccountType[x.type]}
                />
                <AddressField
                  bg={false}
                  label="Pubkey"
                  val={x.extensions.mint?.publicKey.toBase58()}
                />
                <AddressField
                  bg={false}
                  label="Decimals"
                  val={x.extensions.mint?.account.decimals}
                />
                <AddressField
                  bg={false}
                  label="Mint Authority"
                  val={x.extensions.mint?.account.mintAuthority?.toBase58()}
                />
                <AddressField
                  bg={false}
                  label="Supply"
                  val={x.extensions.mint?.account.supply.toNumber()}
                />
                <AddressField
                  bg={false}
                  label="Is Initialized"
                  val={getYesNoString(x.extensions.mint?.account.isInitialized)}
                />
                {x.extensions.mint?.account.freezeAuthority ? (
                  <AddressField
                    bg={false}
                    label="Freeze Authority"
                    val={x.extensions.mint?.account.freezeAuthority?.toBase58()}
                  />
                ) : null}
              </div>
            )
          }
          if (x.type === AccountType.PROGRAM) {
            return (
              <div
                className="bg-bkg-1 p-4 pb-2 rounded-md"
                key={x.pubkey.toBase58()}
              >
                <AddressField
                  bg={false}
                  label="Type"
                  val={AccountType[x.type]}
                />
                <AddressField
                  bg={false}
                  label="Pubkey"
                  val={x.pubkey.toBase58()}
                />
              </div>
            )
          }
        })}
    </div>
  )
}

export default AccountsView
