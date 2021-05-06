
import { useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
// import Authereum from 'authereum';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useDispatch } from 'react-redux';
import { WalletAction } from '../actions'


export default function Wallet_model() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    return {
        get web3Loading() {
            return loading
        },
        async getweb3(wallettype) {
            setLoading(true);
            const providerOptions = {
                metamask: {
                    id: 'injected',
                    name: 'MetaMask',
                    type: 'injected',
                    check: 'isMetaMask'
                },
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        infuraId: '099fc58e0de9451d80b18d7c74caa7c1', // Required
                        network: 'kovan',
                        qrcodeModalOptions: {
                            mobileLinks: [
                                'rainbow',
                                'metamask',
                                'argent',
                                'trust',
                                'imtoken',
                                'pillar'
                            ]
                        }
                    }
                },
            };
            const web3Modal = new Web3Modal({
                network: 'rinkeby',
                cacheProvider: true,
                providerOptions
            });
            // provider = await web3Modal.connectTo('injected');
            const provider = await web3Modal.connectTo(wallettype);
            dispatch(WalletAction.setProvider(provider))
            provider.on('error', e => console.error('WS Error', e));
            provider.on('end', e => console.error('WS End', e));

            provider.on('disconnect', (data, err) => {
                console.log(err);
            });
            provider.on('connect', (info) => {
                console.log(info);
            });

            const web3 = new Web3(provider);
            setLoading(false);
            return web3;
        },
    }
}