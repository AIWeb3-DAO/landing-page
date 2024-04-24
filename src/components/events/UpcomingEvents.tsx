import React from 'react'

import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export default function UpcomingEvents() {
  return (
    <div>

      <h1>Upcoming</h1>
      <p></p>
      <br></br>

 
<Carousel>
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><b>1. Peaq 空投细节发布 （4/23/24)</b> <a href="https://www.peaq.network/blog/peaq-airdrop-for-krest-holders-how-to-double-your-rewards">[原文链接]</a> <br></br>
   <p>
      <b>概述</b>： 波卡生态最火DePIN项目Peaq 要给Krest持有者空投了, 分两阶段进行，有可能获得双倍空投，具体时间在Peaq主网之后发布！细节总结如下：
   </p>
   <p>
      二选一，可以选择初始Peaq空投或者翻倍空投（甚至4倍）：<br></br>
      <b>选项一： $1,000,000 价值的$PEAQ 代币</b><br></br>
      1. 在基于substrate的非托管钱包（可以是js, subwallet, nova, talisman）持有至少2000个Krest代币 <br></br>
      2. peaq的空投数目是基于快照时钱包持有的Krest代币数目决定 （有可能会参考持有时长以及平均持有Krest代币的数量）<br></br>
      3. 空投的代币直接发放到你持有Krest钱包 <br></br>
      <br></br>
      <b>选项二： $2,000,000 价值的$PEAQ 代币</b><br></br>
      1. 在基于substrate的非托管钱包（可以是js, subwallet, nova, talisman）持有至少2000个Krest代币 <br></br>
      2. 将所有的Krest代币跨链到Peaq网络<br></br>
      3. 2倍Peaq代币空投玩法： 将你的Krest代币的一半换成Peaq代币，然后用Krest/Peaq组一个LP，可以拿到选项一的两倍的Peaq代币空投 <br></br>
      4. 四倍Peaq代币空投玩法：另外购买和你持有的Krest等值Peaq代币，然后用Krest/Peaq组一个LP，可以拿到选项一的四倍的Peaq代币空投 <br></br>
   </p>

    </CarouselItem>

    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><b>1. Peaq Airdrop Detail(4/23/24)</b> <a href="https://www.peaq.network/blog/peaq-airdrop-for-krest-holders-how-to-double-your-rewards">[source Link]</a> <br></br>
   <p>
     <b>Overview</b>: The hottest DePIN project in the Polkadot ecosystem, Peaq, is conducting an airdrop for Krest holders in two phases, with the potential to double the airdrop rewards. Specific details will be announced after the launch of Peaq mainnet. A summary of the details is as follows:
   </p>
   <p>
   Choose one of the following two options:<br></br>
   <b>Option 1: $1,000,000 worth of $PEAQ tokens</b><br></br>
   1. Hold 2000+ Krest in a substrate-based non-custodial wallet (e.g., js, subwallet, nova, talisman)<br></br>
   2. The number of airdropped peaq tokens will be based on the number of Krest tokens held in your wallet at the time of the snapshot (the duration of holding and the average number of Krest tokens held may also be considered)<br></br>
   3. Airdropped tokens will be directly distributed to your Krest holding wallet<br></br>
   <br></br>
   <b>Option 2: $2,000,000 worth of $PEAQ tokens</b><br></br>
   1. Hold 2000+ Krest in a substrate-based non-custodial wallet (e.g. js, subwallet, nova, talisman)<br></br>
   2. Bridge all your Krest to the Peaq network<br></br>
   3. 2x Peaq airdrop method: Swap half of your Krest tokens for Peaq, then pair Krest/Peaq to form an LP, which could receive twice the airdrop of Peaq tokens compared to Option 1<br></br>
   4. 4x Peaq airdrop method: Additionally purchase Peaq equivalent to your Krest value, then use Krest/Peaq to form an LP, which could receive four times the airdrop of Peaq compared to Option 1<br></br>
   </p>

    </CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><b>2. InvArch 空投细节 (4/24/2024)</b> <a href="https://twitter.com/InvArchNetwork/status/1783128428843262076">原文链接</a> <br></br>
    <p>
      <b>概述</b>： 波卡生态最火空投项目InvArch，接近完成所有空投！五千万VARCH代币空投到75000个新地址！细节总结如下：
   </p>    
   <p>
       1. 并非所有平行链都提供了对应的数据，所以有可能有的用户参与了但是没有拿到空投 <br></br>
       2. stellaswap那一部分的空投会在之后发放，在xcVARCH到Moonbeam上注册完成之后 <br></br>
       3. InvArch 的DAO质押最低要求会降低，所有拿到空投的都会有机会质押他们的VARCH代币 <br></br>
       4. 拿到代币后如何质押？ 通过这个质押链接质押到AIWeb3 DAO： <a href="https://portal.invarch.network/staking">https://portal.invarch.network/staking</a> <br></br>
       <b>注意：</b>解除质押需要28天，AIWeb3 DAO质押之后会有额外奖励和空投，Ledger硬件钱包目前还未支持提币，需要等待Ledger的更新：<a href="https://forum.polkadot.network/t/polkadot-generic-ledger-app/4295">https://forum.polkadot.network/t/polkadot-generic-ledger-app/4295</a> <br></br>
   </p>

    <Image
          width={360}
          height={500}
          alt='logo'
          src={`/img/InvArchAIWeb3Staking.png`}
          className='rounded-full '
     />
    
    </CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><b>2. InvArch Airdrop Details (4/24/2024)</b> <a href="https://twitter.com/InvArchNetwork/status/1783128428843262076">Source Link</a> <br></br>
    <p>
      <b>Overview</b>: The hottest airdrop project in the Polkadot ecosystem, InvArch, is close to completing all airdrops! 50 million VARCH tokens airdropped to 75,000 new addresses! A summary of the details follows:
    </p>
    <p>
      1. Not all parachains provided the corresponding data, so it is possible that some users participated but did not receive the airdrop.<br></br>
      2. The airdrop part through stellaswap will be distributed later, after the registration of xcVARCH on Moonbeam is completed.<br></br>
      3. The minimum requirement for DAO staking in InvArch will be lowered, and everyone who receives the airdrop will have the opportunity to stake their VARCH tokens.<br></br>
      4. How to stake after receiving tokens? Stake and support AIWeb3 DAO: <a href="https://portal.invarch.network/staking">https://portal.invarch.network/staking</a> <br></br>
      <b>Note:</b> Unstaking requires 28 days, staking with AIWeb3 DAO after that will have additional rewards and airdrops, and the Ledger hardware wallet currently does not support withdrawals; waiting for Ledger’s update: <a href="https://forum.polkadot.network/t/polkadot-generic-ledger-app/4295">https://forum.polkadot.network/t/polkadot-generic-ledger-app/4295</a> <br></br>
    </p>
    <Image
    width={360}
    height={500}
    alt='logo'
    src={"/img/InvArchAIWeb3Staking.png"}
    className='rounded-full '
    />
    </CarouselItem>

    <CarouselItem className="md:basis-1/2 lg:basis-1/3">3</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">3</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">3</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">3</CarouselItem>
  </CarouselContent>

  <CarouselPrevious />
      <CarouselNext />
</Carousel>

    </div>
  )
}
