

const shorten = (str: string) => {
  let size = 3;
  let result = str;
  if (str && str.length > 2 * size) {
    let start = str.slice(0, size);
    let end = str.slice(-size);
    result = `${start}...${end}`;
  }
  return result;
};
interface AccountBoxParams {
  account: { address: string; name: string };
  signer: any;
  api: any;
}

export const AccountBox = ({ api, account, signer }: AccountBoxParams) => {

  const signTransactionHandler = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (api && account?.address && signer) {
      const decimals = api.registry.chainDecimals[0];

      await api.tx.system.remark('I am signing this transaction!').signAndSend(account.address, { signer }, () => {
        // do something with result
      });
    }
  };
  const signMessageHandler = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const signRaw = signer?.signRaw;

    if (!!signRaw && account?.address) {
      const { signature } = await signRaw({
        address: account.address,
        data: 'I am signing this message',
        type: 'bytes',
      });
    }
  };

    console.log("my fuckng signer is here", signer)

  return (
    <div className={` flex justify-between items-center`}>
      <div className="flex space-x-1 items-center text-sm">
      <p className={`text-green-500`}>{shorten(account?.name)}</p>
      <p className={`text-purple-500`}>{shorten(account?.address)}</p>
      </div>

       <div>
         <div className="flex space-x-3 items-center">
        
           <button className="bg-blue-500 text-white rounded-full py-1 px-2 text-sm" >Select </button>
         </div>
       </div>
      <div className={`hidden`}>
        <button className={``} onClick={(e) => signTransactionHandler(e)}>
          Submit Transaction
        </button>
        <button className={``} onClick={(e) => signMessageHandler(e)}>
          Sign Message
        </button>
      </div>
    </div>
  );
};