import { BorshCoder } from '@coral-xyz/anchor';

export type SniperMarket = {
  version: '1.5.0';
  name: 'sniper_market';
  instructions: [
    {
      name: 'createMarket';
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        {
          name: 'treasuryWithdrawalDestination';
          isMut: true;
          isSigner: false;
          docs: [
            'SOL or SPL token account to receive Market fees. If treasury mint is native this will be the same as the `treasury_withdrawl_destination_owner`.'
          ];
        },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              { kind: 'account'; type: 'publicKey'; path: 'authority' }
            ];
          };
        },
        {
          name: 'marketTreasury';
          isMut: true;
          isSigner: false;
          docs: ['Auction House instance treasury PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'treasury' }
            ];
          };
        },
        {
          name: 'marketClock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'clock' }
            ];
          };
        },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'ataProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'marketFeeBps'; type: 'u16' },
        { name: 'makerRebateFeeBps'; type: 'u16' }
      ];
    },
    {
      name: 'updateMarket';
      accounts: [
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
          docs: ['Authority key for the Market.'];
        },
        {
          name: 'newAuthority';
          isMut: false;
          isSigner: true;
          isOptional: true;
          docs: ['New authority key for the Market.'];
        },
        {
          name: 'treasuryWithdrawalDestination';
          isMut: false;
          isSigner: false;
          isOptional: true;
          docs: ['SOL native account to receive fees.'];
        },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'ataProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'marketFeeBps'; type: { option: 'u16' } },
        { name: 'makerFeeBps'; type: { option: 'u16' } },
        { name: 'locked'; type: { option: 'bool' } }
      ];
    },
    {
      name: 'withdrawFromMarketTreasury';
      accounts: [
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
          docs: ['Authority key for the Market.'];
        },
        {
          name: 'treasuryWithdrawalDestination';
          isMut: true;
          isSigner: false;
          docs: [
            'Account that pays for fees if the marketplace executes sales.'
          ];
        },
        {
          name: 'treasury';
          isMut: true;
          isSigner: false;
          docs: ['Market instance fee account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'treasury' }
            ];
          };
        },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: [
            'authority',
            'treasury',
            'treasury_withdrawal_destination'
          ];
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [{ name: 'amount'; type: 'u64' }];
    },
    {
      name: 'createNftValidationWithCreator';
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'nftValidation'; isMut: true; isSigner: true },
        {
          name: 'collectionCreator';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'createNftValidationWithCollectionMint';
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'nftValidation'; isMut: true; isSigner: true },
        { name: 'collectionMint'; isMut: false; isSigner: false },
        {
          name: 'collectionMintMarker';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'marker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'collection_mint' }
            ];
          };
        },
        {
          name: 'collectionCreator';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'updateNftValidation';
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'nftValidation'; isMut: true; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        {
          name: 'collectionMintMarker';
          isMut: false;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'marker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'NFTValidationV1';
                path: 'nft_validation.collection_mint';
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'validationStatus';
          type: { option: { defined: 'NFTValidationStatus' } };
        },
        { name: 'royaltyEnforced'; type: { option: 'bool' } },
        { name: 'bypassMarketFees'; type: { option: 'bool' } },
        { name: 'bypassCosigner'; type: { option: 'bool' } }
      ];
    },
    {
      name: 'addCollectionToNftValidation';
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'nftValidation'; isMut: true; isSigner: false },
        { name: 'collectionMint'; isMut: false; isSigner: false },
        {
          name: 'collectionMintMarker';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'marker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'collection_mint' }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'cancelSolNftOrder';
      accounts: [
        { name: 'maker'; isMut: true; isSigner: true },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
          isOptional: true;
          docs: ['Optional account. If provided, the order is mint based'];
        },
        {
          name: 'nftTokenAccount';
          isMut: true;
          isSigner: false;
          isOptional: true;
          docs: [
            'Optional account but must be provided if nft_mint is provided.'
          ];
        },
        { name: 'nftValidation'; isMut: false; isSigner: false },
        { name: 'nftMetadata'; isMut: true; isSigner: false; isOptional: true },
        { name: 'nftEdition'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'orderState'; isMut: true; isSigner: false },
        {
          name: 'programAsSigner';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'order_state';
              },
              { kind: 'const'; type: 'string'; value: 'signer' }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'sysvarInstructions'; isMut: false; isSigner: false },
        {
          name: 'delegateRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        { name: 'tokenRecord'; isMut: true; isSigner: false; isOptional: true },
        {
          name: 'authRulesProgram';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'authRules'; isMut: false; isSigner: false; isOptional: true }
      ];
      args: [{ name: 'orderType'; type: 'u8' }];
    },
    {
      name: 'authorityCancelInactiveSolNftOrder';
      accounts: [
        { name: 'maker'; isMut: true; isSigner: false },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
          docs: ['Market authority as signer.'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
          isOptional: true;
          docs: ['Optional account. If provided, the order is mint based'];
        },
        {
          name: 'nftTokenAccount';
          isMut: true;
          isSigner: false;
          isOptional: true;
          docs: [
            'Optional account but must be provided if nft_mint is provided.'
          ];
        },
        { name: 'nftValidation'; isMut: false; isSigner: false },
        { name: 'nftMetadata'; isMut: true; isSigner: false; isOptional: true },
        { name: 'nftEdition'; isMut: false; isSigner: false; isOptional: true },
        { name: 'orderState'; isMut: true; isSigner: false },
        {
          name: 'programAsSigner';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'order_state';
              },
              { kind: 'const'; type: 'string'; value: 'signer' }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'sysvarInstructions'; isMut: false; isSigner: false },
        {
          name: 'delegateRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        { name: 'tokenRecord'; isMut: true; isSigner: false; isOptional: true },
        {
          name: 'authRulesProgram';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'authRules'; isMut: false; isSigner: false; isOptional: true }
      ];
      args: [{ name: 'orderType'; type: 'u8' }];
    },
    {
      name: 'crankerCancelStaleSolNftOrder';
      accounts: [
        { name: 'maker'; isMut: true; isSigner: false },
        {
          name: 'cranker';
          isMut: true;
          isSigner: true;
          docs: ['Market authority as signer.'];
        },
        {
          name: 'authorizedCrankerProof';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
          relations: ['cranker'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
          docs: ['If provided, the order is mint based'];
        },
        { name: 'nftTokenAccount'; isMut: true; isSigner: false },
        { name: 'nftValidation'; isMut: false; isSigner: false },
        { name: 'nftMetadata'; isMut: true; isSigner: false },
        { name: 'nftEdition'; isMut: false; isSigner: false },
        { name: 'orderState'; isMut: true; isSigner: false },
        {
          name: 'programAsSigner';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'order_state';
              },
              { kind: 'const'; type: 'string'; value: 'signer' }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'sysvarInstructions'; isMut: false; isSigner: false },
        { name: 'tokenRecord'; isMut: true; isSigner: false; isOptional: true },
        {
          name: 'authRulesProgram';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'authRules'; isMut: false; isSigner: false; isOptional: true }
      ];
      args: [{ name: 'orderType'; type: 'u8' }];
    },
    {
      name: 'createSolNftOrder';
      accounts: [
        { name: 'maker'; isMut: true; isSigner: true },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
          isOptional: true;
          docs: ['Optional account. If provided, the order is mint based'];
        },
        {
          name: 'nftTokenAccount';
          isMut: true;
          isSigner: false;
          isOptional: true;
          docs: [
            'Optional account but must be provided if nft_mint is provided.'
          ];
        },
        {
          name: 'nftMetadata';
          isMut: true;
          isSigner: false;
          isOptional: true;
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        { name: 'nftEdition'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority', 'market_clock'];
        },
        {
          name: 'marketClock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'clock' }
            ];
          };
        },
        {
          name: 'orderState';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'escrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'maker' }
            ];
          };
        },
        {
          name: 'programAsSigner';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'order_state';
              },
              { kind: 'const'; type: 'string'; value: 'signer' }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'sysvarInstructions'; isMut: false; isSigner: false },
        {
          name: 'delegateRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        { name: 'tokenRecord'; isMut: true; isSigner: false; isOptional: true },
        {
          name: 'authRulesProgram';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'authRules'; isMut: false; isSigner: false; isOptional: true }
      ];
      args: [{ name: 'orderParams'; type: { defined: 'CreateOrderParams' } }];
    },
    {
      name: 'executeSolNftOrder';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority', 'treasury'];
        },
        {
          name: 'treasury';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'treasury' }
            ];
          };
        },
        { name: 'buyer'; isMut: true; isSigner: false },
        { name: 'seller'; isMut: true; isSigner: false },
        { name: 'sellNftMint'; isMut: false; isSigner: false },
        { name: 'buyNftMint'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'sellerNftTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['Account but must be provided if nft_mint is provided.'];
        },
        { name: 'buyerNftTokenAccount'; isMut: true; isSigner: false },
        {
          name: 'nftMetadata';
          isMut: true;
          isSigner: false;
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        { name: 'nftEdition'; isMut: false; isSigner: false },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'buyOrderState';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'sellOrderState';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' }
            ];
          };
        },
        {
          name: 'sellerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'seller' }
            ];
          };
        },
        {
          name: 'programAsSigner';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'sell_order_state';
              },
              { kind: 'const'; type: 'string'; value: 'signer' }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'sysvarInstructions'; isMut: false; isSigner: false },
        {
          name: 'sellerTokenRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'buyerTokenRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'authRulesProgram';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'authRules'; isMut: false; isSigner: false; isOptional: true }
      ];
      args: [];
    },
    {
      name: 'depositIntoEscrowVault';
      accounts: [
        {
          name: 'wallet';
          isMut: false;
          isSigner: true;
          docs: ['User wallet account.'];
        },
        {
          name: 'escrowVault';
          isMut: true;
          isSigner: false;
          docs: ['Buyer escrow payment account PDA.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'wallet' }
            ];
          };
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'escrowVaultBump'; type: 'u8' },
        { name: 'amount'; type: 'u64' }
      ];
    },
    {
      name: 'withdrawFromEscrowVault';
      accounts: [
        {
          name: 'wallet';
          isMut: false;
          isSigner: true;
          docs: ['User wallet account.'];
        },
        {
          name: 'escrowVault';
          isMut: true;
          isSigner: false;
          docs: ['Buyer escrow payment account PDA.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'wallet' }
            ];
          };
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'escrowVaultBump'; type: 'u8' },
        { name: 'withdrawalAmount'; type: 'u64' }
      ];
    },
    {
      name: 'buyTensorSingleListingV1';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        { name: 'seller'; isMut: true; isSigner: false },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'buyerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        { name: 'buyerEscrowNftTokenRecord'; isMut: true; isSigner: false },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'buyOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'tswap'; isMut: false; isSigner: false },
        { name: 'tswapFeeVault'; isMut: true; isSigner: false },
        { name: 'tswapSingleListing'; isMut: true; isSigner: false },
        { name: 'tswapNftEscrow'; isMut: true; isSigner: false },
        { name: 'tswapNftEscrowTokenRecord'; isMut: true; isSigner: false },
        { name: 'authRules'; isMut: false; isSigner: false }
      ];
      args: [
        {
          name: 'authData';
          type: { option: { defined: 'TensorswapAuthorizationDataLocal' } };
        }
      ];
    },
    {
      name: 'buyTensorPoolListingV1';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'buyerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        { name: 'buyerEscrowNftTokenRecord'; isMut: true; isSigner: false },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'buyOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'tswapPoolOwner'; isMut: true; isSigner: false },
        { name: 'tswapSolEscrow'; isMut: true; isSigner: false },
        { name: 'tswapNftEscrow'; isMut: true; isSigner: false },
        { name: 'tswapNftReceipt'; isMut: true; isSigner: false },
        { name: 'tswapNftEscrowTokenRecord'; isMut: true; isSigner: false }
      ];
      args: [
        { name: 'config'; type: { defined: 'TensorswapPoolConfig' } },
        {
          name: 'authData';
          type: { option: { defined: 'TensorswapAuthorizationDataLocal' } };
        }
      ];
    },
    {
      name: 'buyMeListingV1';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'buyOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        {
          name: 'nftMetadata';
          isMut: false;
          isSigner: false;
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        { name: 'nftEdition'; isMut: false; isSigner: false },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'buyerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'rent'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'escrowPaymentBump'; type: 'u8' },
        { name: 'programAsSignerBump'; type: 'u8' },
        { name: 'listingPrice'; type: 'u64' },
        { name: 'sellerExpiry'; type: 'i64' },
        { name: 'feeBps'; type: 'u16' }
      ];
    },
    {
      name: 'buyMeMip1ListingV1';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'buyOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'rent'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'escrowPaymentBump'; type: 'u8' },
        { name: 'listingPrice'; type: 'u64' },
        { name: 'feeBps'; type: 'u16' }
      ];
    },
    {
      name: 'buyAuctionHouseListingV1';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        { name: 'seller'; isMut: true; isSigner: false },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'buyerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        { name: 'buyerEscrowNftTokenRecord'; isMut: true; isSigner: false },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'buyOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTBuyOrderLockV1';
                path: 'buy_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'ahEscrowPaymentAccount'; isMut: true; isSigner: false },
        { name: 'ahAuctionHouseFeeAccount'; isMut: true; isSigner: false },
        { name: 'ahBuyerTradeState'; isMut: true; isSigner: false },
        { name: 'ahSellerTradeState'; isMut: true; isSigner: false },
        { name: 'ahFreeTradeState'; isMut: true; isSigner: false },
        { name: 'ahProgramAsSigner'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'escrowPaymentBump'; type: 'u8' },
        { name: 'buyerTradeStateBump'; type: 'u8' },
        { name: 'freeTradeStateBump'; type: 'u8' },
        { name: 'programAsSignerBump'; type: 'u8' },
        { name: 'sellerPrice'; type: 'u64' }
      ];
    },
    {
      name: 'createSolNftBuyOrderLock';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'authorizedCrankerProof';
          isMut: false;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
          relations: ['cranker'];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'buyer'; isMut: true; isSigner: false },
        { name: 'sellNftMint'; isMut: false; isSigner: false },
        { name: 'buyNftMint'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'nftMetadata';
          isMut: true;
          isSigner: false;
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        { name: 'nftEdition'; isMut: false; isSigner: false },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'buyOrderState';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'buyOrderStateLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'buy_order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'sell_nft_mint';
              }
            ];
          };
        },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'cancelSolNftBuyOrderLock';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'authorizedCrankerProof';
          isMut: false;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
          relations: ['cranker'];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'buyer'; isMut: true; isSigner: false },
        { name: 'sellNftMint'; isMut: false; isSigner: false },
        { name: 'buyNftMint'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'buyOrderState';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'buyOrderStateLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'buy_order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'sell_nft_mint';
              }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'withdrawAndCloseBuyOrderLock';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'authorizedCrankerProof';
          isMut: false;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
          relations: ['cranker'];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority', 'treasury'];
        },
        { name: 'buyer'; isMut: true; isSigner: false },
        { name: 'sellNftMint'; isMut: false; isSigner: false },
        { name: 'buyNftMint'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'buyerNftTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['Account but must be provided if nft_mint is provided.'];
        },
        {
          name: 'buyerNftTokenRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' }
            ];
          };
        },
        { name: 'buyerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        {
          name: 'buyerEscrowNftTokenRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'nftMetadata';
          isMut: true;
          isSigner: false;
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        { name: 'nftEdition'; isMut: false; isSigner: false },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'buyOrderState';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'buyOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 0 },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'buy_order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'sell_nft_mint';
              }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'rent'; isMut: false; isSigner: false },
        { name: 'sysvarInstructions'; isMut: false; isSigner: false },
        { name: 'authRules'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'authRulesProgram';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'treasury';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'treasury' }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: 'createSolNftSellOrderLock';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'authorizedCrankerProof';
          isMut: false;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
          relations: ['cranker'];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        { name: 'seller'; isMut: true; isSigner: false },
        { name: 'sellNftMint'; isMut: false; isSigner: false },
        {
          name: 'nftMetadata';
          isMut: true;
          isSigner: false;
          docs: ['Metaplex metadata account decorating SPL mint account.'];
        },
        { name: 'nftEdition'; isMut: false; isSigner: false },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        { name: 'sellerNftTokenAccount'; isMut: true; isSigner: false },
        {
          name: 'sellerTokenRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        { name: 'sellerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        {
          name: 'sellerEscrowNftTokenRecord';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'authRulesProgram';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'authRules'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'sellOrder';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'sellOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 1 },
              { kind: 'account'; type: 'publicKey'; path: 'seller' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'sell_order';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'sell_nft_mint';
              }
            ];
          };
        },
        {
          name: 'sellerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'seller' }
            ];
          };
        },
        {
          name: 'programAsSigner';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTOrderV1';
                path: 'sell_order';
              },
              { kind: 'const'; type: 'string'; value: 'signer' }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'sysvarInstructions'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'withdrawAndCloseSellOrderLock';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'authorizedCrankerProof';
          isMut: false;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
          relations: ['cranker'];
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
          docs: ['Market authority account.'];
        },
        {
          name: 'treasury';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'treasury' }
            ];
          };
        },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority', 'treasury'];
        },
        { name: 'seller'; isMut: true; isSigner: false },
        { name: 'nftMint'; isMut: false; isSigner: false },
        {
          name: 'sellerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'seller' }
            ];
          };
        },
        { name: 'sellerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'sellOrder';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
        },
        {
          name: 'sellOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 1 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'metadataProgram'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'rent'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'createAuthorizedCrankerProof';
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        { name: 'cranker'; isMut: false; isSigner: false },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        {
          name: 'authorizedCrankerProof';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'closeAuthorizedCrankerProof';
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        { name: 'cranker'; isMut: false; isSigner: false },
        {
          name: 'market';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['authority'];
        },
        {
          name: 'authorizedCrankerProof';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'cranker' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'cranker' }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: 'sellIntoAuctionHouseBid';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        { name: 'buyer'; isMut: true; isSigner: false },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'sellerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        { name: 'sellerEscrowNftTokenRecord'; isMut: true; isSigner: false },
        {
          name: 'sellerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'sellOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 1 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'ahEscrowPaymentAccount'; isMut: true; isSigner: false },
        { name: 'ahAuctionHouseFeeAccount'; isMut: true; isSigner: false },
        { name: 'ahBuyerTradeState'; isMut: true; isSigner: false },
        { name: 'ahSellerTradeState'; isMut: true; isSigner: false },
        { name: 'ahFreeTradeState'; isMut: true; isSigner: false },
        { name: 'ahProgramAsSigner'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'escrowPaymentBump'; type: 'u8' },
        { name: 'sellerTradeStateBump'; type: 'u8' },
        { name: 'freeTradeStateBump'; type: 'u8' },
        { name: 'programAsSignerBump'; type: 'u8' },
        { name: 'buyerPrice'; type: 'u64' }
      ];
    },
    {
      name: 'sellIntoTswapTokenPool';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        { name: 'buyer'; isMut: true; isSigner: false },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'sellerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        { name: 'sellerEscrowNftTokenRecord'; isMut: true; isSigner: false },
        {
          name: 'sellerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'sellOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 1 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'poolConfig'; type: { defined: 'TensorswapPoolConfig' } },
        {
          name: 'authData';
          type: { option: { defined: 'TensorswapAuthorizationDataLocal' } };
        }
      ];
    },
    {
      name: 'sellIntoTswapTradePool';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        { name: 'buyer'; isMut: true; isSigner: false },
        { name: 'nftMint'; isMut: false; isSigner: false },
        { name: 'sellerEscrowNftTokenAccount'; isMut: true; isSigner: false },
        { name: 'sellerEscrowNftTokenRecord'; isMut: true; isSigner: false },
        {
          name: 'sellerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.owner';
              }
            ];
          };
        },
        {
          name: 'sellOrderLock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'lock' },
              { kind: 'const'; type: 'u8'; value: 1 },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.owner';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'SOLNFTSellOrderLockV1';
                path: 'sell_order_lock.order_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'nft_mint';
              }
            ];
          };
        },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        { name: 'tokenProgram'; isMut: false; isSigner: false },
        { name: 'associatedTokenProgram'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'poolConfig'; type: { defined: 'TensorswapPoolConfig' } },
        {
          name: 'authData';
          type: { option: { defined: 'TensorswapAuthorizationDataLocal' } };
        }
      ];
    },
    {
      name: 'createSolCnftOrder';
      accounts: [
        { name: 'creator'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['market_clock'];
        },
        {
          name: 'marketClock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'clock' }
            ];
          };
        },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'order';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              { kind: 'account'; type: 'publicKey'; path: 'creator' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'NFTValidationV1';
                path: 'nft_validation';
              },
              {
                kind: 'arg';
                type: { defined: 'BubblegumPayload' };
                path: 'bubblegum_payload.get_asset_id (merkle_tree';
              },
              {
                kind: 'arg';
                type: { defined: 'CreateCompressedNFTOrderParams' };
                path: 'create_order_params.type_raw';
              },
              {
                kind: 'arg';
                type: { defined: 'CreateCompressedNFTOrderParams' };
                path: 'create_order_params.price';
              },
              {
                kind: 'arg';
                type: { defined: 'CreateCompressedNFTOrderParams' };
                path: 'create_order_params.expiry';
              }
            ];
          };
        },
        {
          name: 'creatorEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'creator' }
            ];
          };
        },
        { name: 'assetOwner'; isMut: false; isSigner: false; isOptional: true },
        {
          name: 'assetDelegate';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'treeAuthority';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'merkleTree'; isMut: true; isSigner: false },
        { name: 'compressionProgram'; isMut: false; isSigner: false },
        { name: 'bubblegumProgram'; isMut: false; isSigner: false },
        { name: 'splNoop'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        {
          name: 'eventAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: '__event_authority' }
            ];
          };
        },
        { name: 'program'; isMut: false; isSigner: false }
      ];
      args: [
        {
          name: 'createOrderParams';
          type: { defined: 'CreateCompressedNFTOrderParams' };
        },
        { name: 'bubblegumPayload'; type: { defined: 'BubblegumPayload' } }
      ];
    },
    {
      name: 'executeSolCnftOrder';
      accounts: [
        { name: 'cranker'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['market_clock'];
        },
        {
          name: 'treasury';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'treasury' }
            ];
          };
        },
        {
          name: 'marketClock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'clock' }
            ];
          };
        },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        { name: 'buyer'; isMut: true; isSigner: false },
        {
          name: 'buyOrder';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'NFTValidationV1';
                path: 'nft_validation';
              },
              {
                kind: 'account';
                type: { option: 'publicKey' };
                account: 'SOLCompressedNFTOrderV1';
                path: 'buy_order.asset_id';
              },
              { kind: 'const'; type: 'u8'; value: 0 },
              {
                kind: 'account';
                type: 'u64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'buy_order.price';
              },
              {
                kind: 'account';
                type: 'i64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'buy_order.expiry';
              }
            ];
          };
        },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' }
            ];
          };
        },
        { name: 'seller'; isMut: true; isSigner: false },
        {
          name: 'sellOrder';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              { kind: 'account'; type: 'publicKey'; path: 'seller' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'NFTValidationV1';
                path: 'nft_validation';
              },
              {
                kind: 'account';
                type: { option: 'publicKey' };
                account: 'SOLCompressedNFTOrderV1';
                path: 'sell_order.asset_id';
              },
              { kind: 'const'; type: 'u8'; value: 1 },
              {
                kind: 'account';
                type: 'u64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'sell_order.price';
              },
              {
                kind: 'account';
                type: 'i64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'sell_order.expiry';
              }
            ];
          };
        },
        {
          name: 'sellerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'seller' }
            ];
          };
        },
        { name: 'assetDelegate'; isMut: false; isSigner: false },
        { name: 'treeAuthority'; isMut: false; isSigner: false },
        { name: 'merkleTree'; isMut: true; isSigner: false },
        { name: 'compressionProgram'; isMut: false; isSigner: false },
        { name: 'bubblegumProgram'; isMut: false; isSigner: false },
        { name: 'splNoop'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        {
          name: 'eventAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: '__event_authority' }
            ];
          };
        },
        { name: 'program'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'bubblegumPayload'; type: { defined: 'BubblegumPayload' } }
      ];
    },
    {
      name: 'sellIntoCnftBuyOrder';
      accounts: [
        { name: 'seller'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
          relations: ['market_clock'];
        },
        {
          name: 'treasury';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'treasury' }
            ];
          };
        },
        {
          name: 'marketClock';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'const'; type: 'string'; value: 'clock' }
            ];
          };
        },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        { name: 'buyer'; isMut: true; isSigner: false },
        {
          name: 'buyOrder';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'NFTValidationV1';
                path: 'nft_validation';
              },
              {
                kind: 'account';
                type: { option: 'publicKey' };
                account: 'SOLCompressedNFTOrderV1';
                path: 'buy_order.asset_id';
              },
              { kind: 'const'; type: 'u8'; value: 0 },
              {
                kind: 'account';
                type: 'u64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'buy_order.price';
              },
              {
                kind: 'account';
                type: 'i64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'buy_order.expiry';
              }
            ];
          };
        },
        {
          name: 'buyerEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'buyer' }
            ];
          };
        },
        { name: 'assetDelegate'; isMut: false; isSigner: false },
        { name: 'treeAuthority'; isMut: false; isSigner: false },
        { name: 'merkleTree'; isMut: true; isSigner: false },
        { name: 'compressionProgram'; isMut: false; isSigner: false },
        { name: 'bubblegumProgram'; isMut: false; isSigner: false },
        { name: 'splNoop'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        {
          name: 'eventAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: '__event_authority' }
            ];
          };
        },
        { name: 'program'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'bubblegumPayload'; type: { defined: 'BubblegumPayload' } }
      ];
    },
    {
      name: 'cancelSolCnftOrder';
      accounts: [
        { name: 'creator'; isMut: true; isSigner: true },
        {
          name: 'market';
          isMut: false;
          isSigner: false;
          docs: ['Market instance PDA account.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market.creator';
              }
            ];
          };
        },
        {
          name: 'nftValidation';
          isMut: false;
          isSigner: false;
          relations: ['market'];
        },
        {
          name: 'order';
          isMut: true;
          isSigner: false;
          docs: ['Order state PDA account encoding the order.'];
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              { kind: 'account'; type: 'publicKey'; path: 'creator' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'NFTValidationV1';
                path: 'nft_validation';
              },
              {
                kind: 'account';
                type: { option: 'publicKey' };
                account: 'SOLCompressedNFTOrderV1';
                path: 'order.asset_id';
              },
              {
                kind: 'account';
                type: { defined: 'OrderType' };
                account: 'SOLCompressedNFTOrderV1';
                path: 'order.order_type';
              },
              {
                kind: 'account';
                type: 'u64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'order.price';
              },
              {
                kind: 'account';
                type: 'i64';
                account: 'SOLCompressedNFTOrderV1';
                path: 'order.expiry';
              }
            ];
          };
        },
        {
          name: 'creatorEscrowVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: 'snipermarket' },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Market';
                path: 'market';
              },
              { kind: 'account'; type: 'publicKey'; path: 'creator' }
            ];
          };
        },
        {
          name: 'assetDelegate';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'treeAuthority';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        { name: 'merkleTree'; isMut: true; isSigner: false },
        { name: 'compressionProgram'; isMut: false; isSigner: false },
        { name: 'bubblegumProgram'; isMut: false; isSigner: false },
        { name: 'splNoop'; isMut: false; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false },
        {
          name: 'eventAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              { kind: 'const'; type: 'string'; value: '__event_authority' }
            ];
          };
        },
        { name: 'program'; isMut: false; isSigner: false }
      ];
      args: [
        { name: 'completeLeaf'; type: { option: { defined: 'CompleteLeaf' } } }
      ];
    }
  ];
  accounts: [
    {
      name: 'AuthorizedCrankerProof';
      type: {
        kind: 'struct';
        fields: [
          { name: 'market'; type: 'publicKey' },
          { name: 'cranker'; type: 'publicKey' },
          { name: 'bump'; type: 'u8' }
        ];
      };
    },
    {
      name: 'SOLNFTBuyOrderLockV1';
      type: {
        kind: 'struct';
        fields: [
          { name: 'market'; type: 'publicKey' },
          { name: 'orderState'; type: 'publicKey' },
          { name: 'owner'; type: 'publicKey' },
          { name: 'escrowVaultBump'; type: 'u8' },
          { name: 'price'; type: 'u64' },
          { name: 'purchaseAmount'; type: { option: 'u64' } },
          { name: 'slot'; type: 'u64' },
          { name: 'status'; type: { defined: 'BuyOrderLockStatus' } }
        ];
      };
    },
    {
      name: 'Market';
      type: {
        kind: 'struct';
        fields: [
          { name: 'treasury'; type: 'publicKey' },
          { name: 'treasuryWithdrawalDestination'; type: 'publicKey' },
          { name: 'authority'; type: 'publicKey' },
          { name: 'creator'; type: 'publicKey' },
          { name: 'marketClock'; type: 'publicKey' },
          { name: 'feeBps'; type: 'u16' },
          { name: 'makerRebateBps'; type: 'u16' },
          { name: 'locked'; type: 'bool' },
          { name: 'bump'; type: 'u8' },
          { name: 'treasuryBump'; type: 'u8' }
        ];
      };
    },
    {
      name: 'MarketClock';
      type: {
        kind: 'struct';
        fields: [
          { name: 'orderNonce'; type: 'u64' },
          { name: 'bump'; type: 'u8' }
        ];
      };
    },
    {
      name: 'NFTValidationV1';
      type: {
        kind: 'struct';
        fields: [
          { name: 'market'; type: 'publicKey' },
          { name: 'collectionMint'; type: 'publicKey' },
          { name: 'status'; type: { defined: 'NFTValidationStatus' } },
          { name: 'creators'; type: { vec: 'publicKey' } },
          { name: 'flags'; type: 'u8' }
        ];
      };
    },
    {
      name: 'NFTValidationMarker';
      type: {
        kind: 'struct';
        fields: [{ name: 'nftValidation'; type: 'publicKey' }];
      };
    },
    {
      name: 'SOLNFTSellOrderLockV1';
      type: {
        kind: 'struct';
        fields: [
          { name: 'market'; type: 'publicKey' },
          { name: 'orderState'; type: 'publicKey' },
          { name: 'owner'; type: 'publicKey' },
          { name: 'escrowVaultBump'; type: 'u8' },
          { name: 'price'; type: 'u64' },
          { name: 'saleAmount'; type: { option: 'u64' } },
          { name: 'slot'; type: 'u64' },
          { name: 'status'; type: { defined: 'SellOrderLockStatus' } },
          { name: 'prefunded'; type: 'bool' }
        ];
      };
    },
    {
      name: 'SOLCompressedNFTOrderV1';
      type: {
        kind: 'struct';
        fields: [
          { name: 'market'; type: 'publicKey' },
          { name: 'creator'; type: 'publicKey' },
          { name: 'assetId'; type: { option: 'publicKey' } },
          { name: 'orderType'; type: { defined: 'OrderType' } },
          { name: 'bump'; type: 'u8' },
          { name: 'vaultBump'; type: 'u8' },
          { name: 'orderValidation'; type: { option: 'publicKey' } },
          { name: 'nftValidation'; type: 'publicKey' },
          { name: 'price'; type: 'u64' },
          { name: 'size'; type: 'u64' },
          { name: 'fulfilledSize'; type: 'u64' },
          { name: 'expiry'; type: 'i64' },
          { name: 'orderNonce'; type: 'u64' },
          { name: 'honoredRoyaltyBps'; type: 'u16' },
          { name: 'orderLock'; type: { option: 'publicKey' } },
          { name: 'flags'; type: 'u32' }
        ];
      };
    },
    {
      name: 'SOLNFTOrderV1';
      type: {
        kind: 'struct';
        fields: [
          { name: 'market'; type: 'publicKey' },
          { name: 'owner'; type: 'publicKey' },
          { name: 'nftMint'; type: { option: 'publicKey' } },
          { name: 'orderType'; type: { defined: 'OrderType' } },
          { name: 'bump'; type: 'u8' },
          { name: 'vaultBump'; type: 'u8' },
          { name: 'nftValidation'; type: 'publicKey' },
          { name: 'orderValidation'; type: 'publicKey' },
          { name: 'price'; type: 'u64' },
          { name: 'size'; type: 'u64' },
          { name: 'fulfilledSize'; type: 'u64' },
          { name: 'expireAt'; type: 'i64' },
          { name: 'orderNonce'; type: 'u64' },
          { name: 'honoredRoyaltyBps'; type: 'u16' },
          { name: 'orderLock'; type: { option: 'publicKey' } },
          { name: 'flags'; type: 'u32' }
        ];
      };
    }
  ];
  types: [
    {
      name: 'CreateCompressedNFTOrderParams';
      type: {
        kind: 'struct';
        fields: [
          { name: 'price'; type: 'u64' },
          { name: 'size'; type: 'u64' },
          { name: 'expiry'; type: 'i64' },
          { name: 'honoredRoyaltyBps'; type: 'u16' },
          { name: 'typeRaw'; type: 'u8' },
          { name: 'orderParamFlags'; type: 'u8' }
        ];
      };
    },
    {
      name: 'CreateOrderParams';
      type: {
        kind: 'struct';
        fields: [
          { name: 'price'; type: 'u64' },
          { name: 'size'; type: 'u64' },
          { name: 'typeRaw'; type: 'u8' },
          { name: 'expiry'; type: 'i64' },
          { name: 'honoredRoyaltyBps'; type: 'u16' },
          { name: 'depositEscrowOverride'; type: 'bool' },
          { name: 'postOnly'; type: 'bool' }
        ];
      };
    },
    {
      name: 'CancelOrderParams';
      type: {
        kind: 'struct';
        fields: [
          { name: 'price'; type: 'u64' },
          { name: 'typeRaw'; type: 'u8' }
        ];
      };
    },
    {
      name: 'GenericOrder';
      type: {
        kind: 'struct';
        fields: [
          { name: 'price'; type: 'u64' },
          { name: 'size'; type: 'u64' },
          { name: 'honoredRoyaltiesBps'; type: 'u16' },
          { name: 'orderType'; type: { defined: 'OrderType' } },
          { name: 'postOnly'; type: 'bool' },
          { name: 'vaultBump'; type: 'u8' },
          { name: 'orderNonce'; type: 'u64' }
        ];
      };
    },
    {
      name: 'CompleteLeaf';
      type: {
        kind: 'struct';
        fields: [
          { name: 'root'; type: { array: ['u8', 32] } },
          { name: 'dataHash'; type: { array: ['u8', 32] } },
          { name: 'creatorHash'; type: { array: ['u8', 32] } },
          { name: 'nonce'; type: 'u64' },
          { name: 'index'; type: 'u32' }
        ];
      };
    },
    {
      name: 'PreHashedCreatorPayload';
      type: {
        kind: 'struct';
        fields: [
          { name: 'root'; type: { array: ['u8', 32] } },
          { name: 'metadataArgsHash'; type: { array: ['u8', 32] } },
          { name: 'sellerFeeBasisPoints'; type: 'u16' },
          { name: 'nonce'; type: 'u64' },
          { name: 'index'; type: 'u32' },
          { name: 'creators'; type: { defined: 'CreatorPackedBytes' } }
        ];
      };
    },
    {
      name: 'PreHashedMetadataPayload';
      type: {
        kind: 'struct';
        fields: [
          { name: 'root'; type: { array: ['u8', 32] } },
          { name: 'nonce'; type: 'u64' },
          { name: 'index'; type: 'u32' },
          { name: 'metadataArgs'; type: { defined: 'PackedMetadataArgs' } }
        ];
      };
    },
    {
      name: 'PackedUses';
      type: {
        kind: 'struct';
        fields: [
          { name: 'useMethod'; type: 'u8' },
          { name: 'remaining'; type: 'u64' },
          { name: 'total'; type: 'u64' }
        ];
      };
    },
    {
      name: 'PackedCollection';
      type: {
        kind: 'struct';
        fields: [
          { name: 'verified'; type: 'bool' },
          { name: 'key'; type: 'publicKey' }
        ];
      };
    },
    {
      name: 'PackedMetadataArgs';
      type: {
        kind: 'struct';
        fields: [
          { name: 'name'; type: 'string' },
          { name: 'symbol'; type: 'string' },
          { name: 'uri'; type: { defined: 'PackedURL' } },
          { name: 'editionNonce'; type: { option: 'u8' } },
          { name: 'tokenStandard'; type: { option: 'u8' } },
          {
            name: 'collection';
            type: { option: { defined: 'PackedCollection' } };
          },
          { name: 'uses'; type: { option: { defined: 'PackedUses' } } },
          { name: 'tokenProgramVersion'; type: 'u8' },
          { name: 'creatorBytes'; type: { defined: 'CreatorPackedBytes' } },
          { name: 'compressedFields'; type: 'u16' }
        ];
      };
    },
    {
      name: 'BuyOrderLockStatus';
      type: {
        kind: 'enum';
        variants: [
          { name: 'Uninitialized' },
          { name: 'Initialized' },
          { name: 'Purchased' },
          { name: 'Fulfilled' }
        ];
      };
    },
    {
      name: 'NFTValidationStatus';
      type: {
        kind: 'enum';
        variants: [{ name: 'Inactive' }, { name: 'Active' }];
      };
    },
    {
      name: 'SellOrderLockStatus';
      type: {
        kind: 'enum';
        variants: [
          { name: 'Uninitialized' },
          { name: 'Initialized' },
          { name: 'Sold' },
          { name: 'Fulfilled' }
        ];
      };
    },
    {
      name: 'OrderType';
      type: { kind: 'enum'; variants: [{ name: 'Buy' }, { name: 'Sell' }] };
    },
    {
      name: 'BubblegumPayload';
      type: {
        kind: 'enum';
        variants: [
          { name: 'None' },
          { name: 'Creator'; fields: [{ defined: 'PreHashedCreatorPayload' }] },
          {
            name: 'Metadata';
            fields: [{ defined: 'PreHashedMetadataPayload' }];
          }
        ];
      };
    },
    {
      name: 'PackedURL';
      type: {
        kind: 'enum';
        variants: [
          { name: 'Https'; fields: ['string', 'string'] },
          { name: 'Http'; fields: ['string', 'string'] },
          { name: 'Raw'; fields: ['string'] }
        ];
      };
    },
    {
      name: 'CreatorPackedBytes';
      type: {
        kind: 'enum';
        variants: [
          { name: 'NoCreators' },
          { name: 'OneCreators'; fields: [{ array: ['u8', 1] }] },
          { name: 'TwoCreators'; fields: [{ array: ['u8', 2] }] },
          { name: 'ThreeCreators'; fields: [{ array: ['u8', 3] }] },
          { name: 'FourCreators'; fields: [{ array: ['u8', 4] }] },
          { name: 'FiveCreators'; fields: [{ array: ['u8', 5] }] }
        ];
      };
    },
    {
      name: 'TensorswapAuthorizationDataLocal';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'payload';
            type: { vec: { defined: 'TensorswapTaggedPayload' } };
          }
        ];
      };
    },
    {
      name: 'TensorswapTaggedPayload';
      type: {
        kind: 'struct';
        fields: [
          { name: 'name'; type: 'string' },
          { name: 'payload'; type: { defined: 'TensorswapPayloadTypeLocal' } }
        ];
      };
    },
    {
      name: 'TensorswapPayloadTypeLocal';
      type: {
        kind: 'enum';
        variants: [
          { name: 'Pubkey'; fields: ['publicKey'] },
          { name: 'Seeds'; fields: [{ defined: 'TensorswapSeedsVecLocal' }] },
          {
            name: 'MerkleProof';
            fields: [{ defined: 'TensorswapProofInfoLocal' }];
          },
          { name: 'Number'; fields: ['u64'] }
        ];
      };
    },
    {
      name: 'TensorswapSeedsVecLocal';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'seeds';
            docs: ['The vector of derivation seeds.'];
            type: { vec: 'bytes' };
          }
        ];
      };
    },
    {
      name: 'TensorswapProofInfoLocal';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'proof';
            docs: ['The merkle proof.'];
            type: { vec: { array: ['u8', 32] } };
          }
        ];
      };
    },
    {
      name: 'TensorswapPoolConfig';
      type: {
        kind: 'struct';
        fields: [
          { name: 'poolType'; type: { defined: 'TensorswapPoolType' } },
          { name: 'curveType'; type: { defined: 'TensorswapCurveType' } },
          { name: 'startingPrice'; type: 'u64' },
          { name: 'delta'; type: 'u64' },
          { name: 'mmCompoundFees'; docs: ['Trade pools only']; type: 'bool' },
          { name: 'mmFeeBps'; type: { option: 'u16' } }
        ];
      };
    },
    {
      name: 'TensorswapPoolType';
      type: {
        kind: 'enum';
        variants: [{ name: 'Token' }, { name: 'NFT' }, { name: 'Trade' }];
      };
    },
    {
      name: 'TensorswapCurveType';
      type: {
        kind: 'enum';
        variants: [{ name: 'Linear' }, { name: 'Exponential' }];
      };
    }
  ];
  events: [
    {
      name: 'WithdrawalFromEscrowVaultEvent';
      fields: [
        { name: 'withdrawalAmount'; type: 'u64'; index: false },
        { name: 'label'; type: 'string'; index: true }
      ];
    },
    {
      name: 'DepositIntoEscrowVaultEvent';
      fields: [
        { name: 'depositAmount'; type: 'u64'; index: false },
        { name: 'label'; type: 'string'; index: true }
      ];
    },
    {
      name: 'CNFTCreateOrderEventV1';
      fields: [
        { name: 'assetId'; type: { option: 'publicKey' }; index: false },
        { name: 'label'; type: 'string'; index: true }
      ];
    },
    {
      name: 'CNFTCancelOrderEventV1';
      fields: [
        { name: 'assetId'; type: { option: 'publicKey' }; index: false },
        { name: 'orderType'; type: 'u8'; index: false },
        { name: 'label'; type: 'string'; index: true }
      ];
    },
    {
      name: 'CNFTExecuteOrderEventV1';
      fields: [
        { name: 'assetId'; type: 'publicKey'; index: false },
        { name: 'buyOrderNonce'; type: 'u64'; index: false },
        { name: 'buyOrderPrice'; type: 'u64'; index: false },
        { name: 'buyOrderSize'; type: 'u64'; index: false },
        { name: 'buyOrderFulfilledSize'; type: 'u64'; index: false },
        { name: 'sellOrderNonce'; type: 'u64'; index: false },
        { name: 'sellOrderPrice'; type: 'u64'; index: false },
        { name: 'sellOrderSize'; type: 'u64'; index: false },
        { name: 'sellOrderFulfilledSize'; type: 'u64'; index: false },
        { name: 'sellerRecievedAmount'; type: 'u64'; index: false },
        { name: 'sellerFeeBasisPoints'; type: 'u16'; index: false },
        { name: 'creatorRoyaltiesPaid'; type: 'u64'; index: false },
        { name: 'makerRebateAmount'; type: 'u64'; index: false },
        { name: 'marketFeesPaid'; type: 'u64'; index: false },
        { name: 'honoredRoyaltiesBasisPoints'; type: 'u16'; index: false },
        { name: 'label'; type: 'string'; index: true }
      ];
    },
    {
      name: 'ExecuteOrderEventV1';
      fields: [
        { name: 'sellerAmount'; type: 'u64'; index: false },
        { name: 'royaltiesAmount'; type: 'u64'; index: false },
        { name: 'makerRebateAmount'; type: 'u64'; index: false },
        { name: 'feesAmount'; type: 'u64'; index: false },
        { name: 'label'; type: 'string'; index: true }
      ];
    },
    {
      name: 'CreateOrderEvent';
      fields: [{ name: 'orderNonce'; type: 'u64'; index: false }];
    }
  ];
  errors: [
    { code: 6000; name: 'PublicKeyMismatch'; msg: 'PublicKeyMismatch' },
    { code: 6001; name: 'UninitializedAccount'; msg: 'UninitializedAccount' },
    { code: 6002; name: 'InvalidTokenAccount'; msg: 'Invalid token account' },
    { code: 6003; name: 'InvalidMintAccount'; msg: 'Invalid mint account' },
    {
      code: 6004;
      name: 'TokenAccountMintMismatch';
      msg: 'Invalid token account mint';
    },
    { code: 6005; name: 'IncorrectAccountOwner'; msg: 'IncorrectAccountOwner' },
    {
      code: 6006;
      name: 'IncorrectTokenAccountOwner';
      msg: 'IncorrectTokenAccountOwner';
    },
    { code: 6007; name: 'InvalidTokenOwner'; msg: 'InvalidTokenOwner' },
    { code: 6008; name: 'NotRentExempt'; msg: 'NotRentExempt' },
    { code: 6009; name: 'NumericalOverflow'; msg: 'NumericalOverflow' },
    {
      code: 6010;
      name: 'ExpectedSolAccount';
      msg: 'Expected a sol account but got an spl token account instead';
    },
    { code: 6011; name: 'DerivedKeyInvalid'; msg: 'Derived key invalid' },
    { code: 6012; name: 'MetadataDoesntExist'; msg: "Metadata doesn't exist" },
    { code: 6013; name: 'InvalidTokenAmount'; msg: 'Invalid token amount' },
    {
      code: 6014;
      name: 'SellerATACannotHaveDelegate';
      msg: 'Seller ata cannot have a delegate set';
    },
    {
      code: 6015;
      name: 'BuyerATACannotHaveDelegate';
      msg: 'Buyer ata cannot have a delegate set';
    },
    {
      code: 6016;
      name: 'InvalidBasisPoints';
      msg: 'BP must be less than or equal to 10000';
    },
    { code: 6017; name: 'InvalidBump'; msg: 'InvalidBump' },
    {
      code: 6018;
      name: 'BumpSeedNotInHashMap';
      msg: 'Bump seed not in hash map.';
    },
    {
      code: 6019;
      name: 'InsufficientFunds';
      msg: 'Insufficient funds in escrow vault to purchase.';
    },
    {
      code: 6020;
      name: 'InvalidHonoredBasisPoints';
      msg: 'The sale has set invalid honored basis points.';
    },
    {
      code: 6021;
      name: 'MintFailedValidation';
      msg: 'Mint failed NFT validation';
    },
    { code: 6022; name: 'OrderExpiryInvalid'; msg: 'OrderExpiryInvalid' },
    { code: 6023; name: 'OrderExpired'; msg: 'OrderExpired' },
    { code: 6024; name: 'OrderAlreadyFulfilled'; msg: 'OrderAlreadyFulfilled' },
    { code: 6025; name: 'InvalidOrderSize'; msg: 'Invalid order size' },
    { code: 6026; name: 'MarketLocked'; msg: 'Market locked' },
    {
      code: 6027;
      name: 'InactiveNFTValidation';
      msg: 'Inactive NFT validation';
    },
    { code: 6028; name: 'MissingMint'; msg: 'Instruction missing mint' },
    {
      code: 6029;
      name: 'MissingTokenAccount';
      msg: 'Instruction missing token account';
    },
    {
      code: 6030;
      name: 'UnexpectedMintOrTokenAccount';
      msg: 'Instruction should not have mint or token account';
    },
    { code: 6031; name: 'InvalidOrderType'; msg: 'InvalidOrderType' },
    { code: 6032; name: 'OrderMismatch'; msg: 'Order parameters do not match' },
    { code: 6033; name: 'EmptyNFTValidation'; msg: 'EmptyNFTValidation' },
    { code: 6034; name: 'InvalidAuthority'; msg: 'InvalidAuthority' },
    { code: 6035; name: 'InvalidMarket'; msg: 'InvalidMarket' },
    { code: 6036; name: 'InvalidTreasury'; msg: 'InvalidTreasury' },
    {
      code: 6037;
      name: 'InvalidTreasuryWithdrawalDestination';
      msg: 'InvalidTreasuryWithdrawalDestination';
    },
    { code: 6038; name: 'InvalidMarketClock'; msg: 'InvalidMarketClock' },
    { code: 6039; name: 'EscrowBalanceZero'; msg: 'EscrowBalanceZero' },
    { code: 6040; name: 'WithdrawalAmountZero'; msg: 'WithdrawalAmountZero' },
    { code: 6041; name: 'TooManyCreators'; msg: 'TooManyCreators' },
    {
      code: 6042;
      name: 'ValidationAlreadyHasCollectionMint';
      msg: 'ValidationAlreadyHasCollectionMint';
    },
    { code: 6043; name: 'AlreadyInitialized'; msg: 'AlreadyInitialized' },
    { code: 6044; name: 'OrderLocked'; msg: 'OrderLocked' },
    { code: 6045; name: 'OrderNotLocked'; msg: 'OrderNotLocked' },
    { code: 6046; name: 'InvalidOrder'; msg: 'InvalidOrder' },
    { code: 6047; name: 'OrderLockExpired'; msg: 'OrderLockExpired' },
    {
      code: 6048;
      name: 'OrderLockAlreadyPurchased';
      msg: 'OrderAlreadyPurchasd';
    },
    {
      code: 6049;
      name: 'OrderLockAlreadyInitialized';
      msg: 'OrderLockAlreadyInitialized';
    },
    {
      code: 6050;
      name: 'OrderLockAlreadyFulfilled';
      msg: 'OrderAlreadyFulfilled';
    },
    {
      code: 6051;
      name: 'OrderLockNotInitialized';
      msg: 'OrderLockNotInitialized';
    },
    { code: 6052; name: 'OrderLockNotPurchased'; msg: 'OrderLockNotPurchased' },
    { code: 6053; name: 'UnauthorizedCranker'; msg: 'UnauthorizedCranker' },
    { code: 6054; name: 'MissingAccount'; msg: 'Missing Account' },
    { code: 6055; name: 'CorruptFlag'; msg: 'CorruptFlag' },
    { code: 6056; name: 'FlagNotSet'; msg: 'FlagNotSet' },
    { code: 6057; name: 'OrderPostOnly'; msg: 'Order post only' },
    { code: 6058; name: 'InvalidEdition'; msg: 'InvalidEdition' },
    { code: 6059; name: 'StaleSellOrder'; msg: 'StaleSellOrder' },
    { code: 6060; name: 'CannotSelfTrade'; msg: 'CannotSelfTrade' },
    { code: 6061; name: 'PaidTooMuch'; msg: 'PaidTooMuch' },
    { code: 6062; name: 'ActiveNFTValidation'; msg: 'ActiveNFTValidation' },
    { code: 6063; name: 'TokenRecordLocked'; msg: 'TokenRecordLocked' },
    { code: 6064; name: 'TokenRecordDelegated'; msg: 'TokenRecordDelegated' },
    { code: 6065; name: 'OrderLockAlreadySold'; msg: 'OrderLockAlreadySold' },
    { code: 6066; name: 'SoldTooCheap'; msg: 'SoldTooCheap' },
    { code: 6067; name: 'FailedDeserialization'; msg: 'FailedDeserialization' },
    { code: 6068; name: 'MissingTokenRecord'; msg: 'MissingTokenRecord' },
    { code: 6069; name: 'MissingParams'; msg: 'MissingParams' },
    { code: 6070; name: 'InvalidParams'; msg: 'InvalidParams' },
    { code: 6071; name: 'InvalidHash'; msg: 'InvalidHash' },
    {
      code: 6072;
      name: 'ExpectedPartialVerification';
      msg: 'ExpectedPartialVerification';
    },
    {
      code: 6073;
      name: 'CannotPlaceCollectionBid';
      msg: 'CannotPlaceCollectionBid';
    }
  ];
};

export const IDL: SniperMarket = {
  version: '1.5.0',
  name: 'sniper_market',
  instructions: [
    {
      name: 'createMarket',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'treasuryWithdrawalDestination',
          isMut: true,
          isSigner: false,
          docs: [
            'SOL or SPL token account to receive Market fees. If treasury mint is native this will be the same as the `treasury_withdrawl_destination_owner`.',
          ],
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'authority',
              },
            ],
          },
        },
        {
          name: 'marketTreasury',
          isMut: true,
          isSigner: false,
          docs: ['Auction House instance treasury PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'treasury',
              },
            ],
          },
        },
        {
          name: 'marketClock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'clock',
              },
            ],
          },
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'ataProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'marketFeeBps',
          type: 'u16',
        },
        {
          name: 'makerRebateFeeBps',
          type: 'u16',
        },
      ],
    },
    {
      name: 'updateMarket',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
          docs: ['Authority key for the Market.'],
        },
        {
          name: 'newAuthority',
          isMut: false,
          isSigner: true,
          isOptional: true,
          docs: ['New authority key for the Market.'],
        },
        {
          name: 'treasuryWithdrawalDestination',
          isMut: false,
          isSigner: false,
          isOptional: true,
          docs: ['SOL native account to receive fees.'],
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'ataProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'marketFeeBps',
          type: {
            option: 'u16',
          },
        },
        {
          name: 'makerFeeBps',
          type: {
            option: 'u16',
          },
        },
        {
          name: 'locked',
          type: {
            option: 'bool',
          },
        },
      ],
    },
    {
      name: 'withdrawFromMarketTreasury',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
          docs: ['Authority key for the Market.'],
        },
        {
          name: 'treasuryWithdrawalDestination',
          isMut: true,
          isSigner: false,
          docs: [
            'Account that pays for fees if the marketplace executes sales.',
          ],
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
          docs: ['Market instance fee account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'treasury',
              },
            ],
          },
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: [
            'authority',
            'treasury',
            'treasury_withdrawal_destination',
          ],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createNftValidationWithCreator',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'nftValidation',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collectionCreator',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createNftValidationWithCollectionMint',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'nftValidation',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collectionMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collectionMintMarker',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'marker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'collectionCreator',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'updateNftValidation',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'nftValidation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collectionMintMarker',
          isMut: false,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'marker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'NFTValidationV1',
                path: 'nft_validation.collection_mint',
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'validationStatus',
          type: {
            option: {
              defined: 'NFTValidationStatus',
            },
          },
        },
        {
          name: 'royaltyEnforced',
          type: {
            option: 'bool',
          },
        },
        {
          name: 'bypassMarketFees',
          type: {
            option: 'bool',
          },
        },
        {
          name: 'bypassCosigner',
          type: {
            option: 'bool',
          },
        },
      ],
    },
    {
      name: 'addCollectionToNftValidation',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'nftValidation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collectionMintMarker',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'marker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'cancelSolNftOrder',
      accounts: [
        {
          name: 'maker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
          isOptional: true,
          docs: ['Optional account. If provided, the order is mint based'],
        },
        {
          name: 'nftTokenAccount',
          isMut: true,
          isSigner: false,
          isOptional: true,
          docs: [
            'Optional account but must be provided if nft_mint is provided.',
          ],
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'orderState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'programAsSigner',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'order_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'signer',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'delegateRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'tokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRulesProgram',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: 'orderType',
          type: 'u8',
        },
      ],
    },
    {
      name: 'authorityCancelInactiveSolNftOrder',
      accounts: [
        {
          name: 'maker',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
          docs: ['Market authority as signer.'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
          isOptional: true,
          docs: ['Optional account. If provided, the order is mint based'],
        },
        {
          name: 'nftTokenAccount',
          isMut: true,
          isSigner: false,
          isOptional: true,
          docs: [
            'Optional account but must be provided if nft_mint is provided.',
          ],
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'orderState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'programAsSigner',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'order_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'signer',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'delegateRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'tokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRulesProgram',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: 'orderType',
          type: 'u8',
        },
      ],
    },
    {
      name: 'crankerCancelStaleSolNftOrder',
      accounts: [
        {
          name: 'maker',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
          docs: ['Market authority as signer.'],
        },
        {
          name: 'authorizedCrankerProof',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
          relations: ['cranker'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
          docs: ['If provided, the order is mint based'],
        },
        {
          name: 'nftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'orderState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'programAsSigner',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'order_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'signer',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRulesProgram',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: 'orderType',
          type: 'u8',
        },
      ],
    },
    {
      name: 'createSolNftOrder',
      accounts: [
        {
          name: 'maker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
          isOptional: true,
          docs: ['Optional account. If provided, the order is mint based'],
        },
        {
          name: 'nftTokenAccount',
          isMut: true,
          isSigner: false,
          isOptional: true,
          docs: [
            'Optional account but must be provided if nft_mint is provided.',
          ],
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
          isOptional: true,
          docs: ['Metaplex metadata account decorating SPL mint account.'],
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority', 'market_clock'],
        },
        {
          name: 'marketClock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'clock',
              },
            ],
          },
        },
        {
          name: 'orderState',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'escrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'maker',
              },
            ],
          },
        },
        {
          name: 'programAsSigner',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'order_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'signer',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'delegateRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'tokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRulesProgram',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: 'orderParams',
          type: {
            defined: 'CreateOrderParams',
          },
        },
      ],
    },
    {
      name: 'executeSolNftOrder',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority', 'treasury'],
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'treasury',
              },
            ],
          },
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'seller',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellNftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyNftMint',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'sellerNftTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['Account but must be provided if nft_mint is provided.'],
        },
        {
          name: 'buyerNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
          docs: ['Metaplex metadata account decorating SPL mint account.'],
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'buyOrderState',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'sellOrderState',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
            ],
          },
        },
        {
          name: 'sellerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'seller',
              },
            ],
          },
        },
        {
          name: 'programAsSigner',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'sell_order_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'signer',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sellerTokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'buyerTokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRulesProgram',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [],
    },
    {
      name: 'depositIntoEscrowVault',
      accounts: [
        {
          name: 'wallet',
          isMut: false,
          isSigner: true,
          docs: ['User wallet account.'],
        },
        {
          name: 'escrowVault',
          isMut: true,
          isSigner: false,
          docs: ['Buyer escrow payment account PDA.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'wallet',
              },
            ],
          },
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'escrowVaultBump',
          type: 'u8',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'withdrawFromEscrowVault',
      accounts: [
        {
          name: 'wallet',
          isMut: false,
          isSigner: true,
          docs: ['User wallet account.'],
        },
        {
          name: 'escrowVault',
          isMut: true,
          isSigner: false,
          docs: ['Buyer escrow payment account PDA.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'wallet',
              },
            ],
          },
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'escrowVaultBump',
          type: 'u8',
        },
        {
          name: 'withdrawalAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'buyTensorSingleListingV1',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'seller',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'buyOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'tswap',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tswapFeeVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tswapSingleListing',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tswapNftEscrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tswapNftEscrowTokenRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'authData',
          type: {
            option: {
              defined: 'TensorswapAuthorizationDataLocal',
            },
          },
        },
      ],
    },
    {
      name: 'buyTensorPoolListingV1',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'buyOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'tswapPoolOwner',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tswapSolEscrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tswapNftEscrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tswapNftReceipt',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tswapNftEscrowTokenRecord',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'config',
          type: {
            defined: 'TensorswapPoolConfig',
          },
        },
        {
          name: 'authData',
          type: {
            option: {
              defined: 'TensorswapAuthorizationDataLocal',
            },
          },
        },
      ],
    },
    {
      name: 'buyMeListingV1',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'buyOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'nftMetadata',
          isMut: false,
          isSigner: false,
          docs: ['Metaplex metadata account decorating SPL mint account.'],
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'escrowPaymentBump',
          type: 'u8',
        },
        {
          name: 'programAsSignerBump',
          type: 'u8',
        },
        {
          name: 'listingPrice',
          type: 'u64',
        },
        {
          name: 'sellerExpiry',
          type: 'i64',
        },
        {
          name: 'feeBps',
          type: 'u16',
        },
      ],
    },
    {
      name: 'buyMeMip1ListingV1',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'buyOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'escrowPaymentBump',
          type: 'u8',
        },
        {
          name: 'listingPrice',
          type: 'u64',
        },
        {
          name: 'feeBps',
          type: 'u16',
        },
      ],
    },
    {
      name: 'buyAuctionHouseListingV1',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'seller',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'buyOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTBuyOrderLockV1',
                path: 'buy_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'ahEscrowPaymentAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahAuctionHouseFeeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahBuyerTradeState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahSellerTradeState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahFreeTradeState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahProgramAsSigner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'escrowPaymentBump',
          type: 'u8',
        },
        {
          name: 'buyerTradeStateBump',
          type: 'u8',
        },
        {
          name: 'freeTradeStateBump',
          type: 'u8',
        },
        {
          name: 'programAsSignerBump',
          type: 'u8',
        },
        {
          name: 'sellerPrice',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createSolNftBuyOrderLock',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorizedCrankerProof',
          isMut: false,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
          relations: ['cranker'],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellNftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyNftMint',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
          docs: ['Metaplex metadata account decorating SPL mint account.'],
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'buyOrderState',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'buyOrderStateLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'buy_order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'sell_nft_mint',
              },
            ],
          },
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'cancelSolNftBuyOrderLock',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorizedCrankerProof',
          isMut: false,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
          relations: ['cranker'],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellNftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyNftMint',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'buyOrderState',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'buyOrderStateLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'buy_order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'sell_nft_mint',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'withdrawAndCloseBuyOrderLock',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorizedCrankerProof',
          isMut: false,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
          relations: ['cranker'],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority', 'treasury'],
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellNftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'buyNftMint',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'buyerNftTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['Account but must be provided if nft_mint is provided.'],
        },
        {
          name: 'buyerNftTokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
            ],
          },
        },
        {
          name: 'buyerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
          docs: ['Metaplex metadata account decorating SPL mint account.'],
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'buyOrderState',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'buyOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'buy_order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'sell_nft_mint',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRulesProgram',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'treasury',
              },
            ],
          },
        },
      ],
      args: [],
    },
    {
      name: 'createSolNftSellOrderLock',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorizedCrankerProof',
          isMut: false,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
          relations: ['cranker'],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'seller',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellNftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMetadata',
          isMut: true,
          isSigner: false,
          docs: ['Metaplex metadata account decorating SPL mint account.'],
        },
        {
          name: 'nftEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'sellerNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerTokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'sellerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRulesProgram',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'authRules',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'sellOrder',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'sellOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 1,
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'seller',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'sell_order',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'sell_nft_mint',
              },
            ],
          },
        },
        {
          name: 'sellerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'seller',
              },
            ],
          },
        },
        {
          name: 'programAsSigner',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTOrderV1',
                path: 'sell_order',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'signer',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sysvarInstructions',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'withdrawAndCloseSellOrderLock',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorizedCrankerProof',
          isMut: false,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
          relations: ['cranker'],
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
          docs: ['Market authority account.'],
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'treasury',
              },
            ],
          },
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority', 'treasury'],
        },
        {
          name: 'seller',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sellerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'seller',
              },
            ],
          },
        },
        {
          name: 'sellerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'sellOrder',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
        },
        {
          name: 'sellOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 1,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createAuthorizedCrankerProof',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'cranker',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'authorizedCrankerProof',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'closeAuthorizedCrankerProof',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'cranker',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'market',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['authority'],
        },
        {
          name: 'authorizedCrankerProof',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'cranker',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'cranker',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'sellIntoAuctionHouseBid',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sellerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'sellOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 1,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'ahEscrowPaymentAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahAuctionHouseFeeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahBuyerTradeState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahSellerTradeState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahFreeTradeState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ahProgramAsSigner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'escrowPaymentBump',
          type: 'u8',
        },
        {
          name: 'sellerTradeStateBump',
          type: 'u8',
        },
        {
          name: 'freeTradeStateBump',
          type: 'u8',
        },
        {
          name: 'programAsSignerBump',
          type: 'u8',
        },
        {
          name: 'buyerPrice',
          type: 'u64',
        },
      ],
    },
    {
      name: 'sellIntoTswapTokenPool',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sellerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'sellOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 1,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'poolConfig',
          type: {
            defined: 'TensorswapPoolConfig',
          },
        },
        {
          name: 'authData',
          type: {
            option: {
              defined: 'TensorswapAuthorizationDataLocal',
            },
          },
        },
      ],
    },
    {
      name: 'sellIntoTswapTradePool',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'sellerEscrowNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerEscrowNftTokenRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.owner',
              },
            ],
          },
        },
        {
          name: 'sellOrderLock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'lock',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 1,
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.owner',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'SOLNFTSellOrderLockV1',
                path: 'sell_order_lock.order_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'nft_mint',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'poolConfig',
          type: {
            defined: 'TensorswapPoolConfig',
          },
        },
        {
          name: 'authData',
          type: {
            option: {
              defined: 'TensorswapAuthorizationDataLocal',
            },
          },
        },
      ],
    },
    {
      name: 'createSolCnftOrder',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['market_clock'],
        },
        {
          name: 'marketClock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'clock',
              },
            ],
          },
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'order',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'creator',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'NFTValidationV1',
                path: 'nft_validation',
              },
              {
                kind: 'arg',
                type: {
                  defined: 'BubblegumPayload',
                },
                path: 'bubblegum_payload.get_asset_id (merkle_tree',
              },
              {
                kind: 'arg',
                type: {
                  defined: 'CreateCompressedNFTOrderParams',
                },
                path: 'create_order_params.type_raw',
              },
              {
                kind: 'arg',
                type: {
                  defined: 'CreateCompressedNFTOrderParams',
                },
                path: 'create_order_params.price',
              },
              {
                kind: 'arg',
                type: {
                  defined: 'CreateCompressedNFTOrderParams',
                },
                path: 'create_order_params.expiry',
              },
            ],
          },
        },
        {
          name: 'creatorEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'creator',
              },
            ],
          },
        },
        {
          name: 'assetOwner',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'assetDelegate',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'treeAuthority',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'merkleTree',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'compressionProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'bubblegumProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splNoop',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'eventAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: '__event_authority',
              },
            ],
          },
        },
        {
          name: 'program',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'createOrderParams',
          type: {
            defined: 'CreateCompressedNFTOrderParams',
          },
        },
        {
          name: 'bubblegumPayload',
          type: {
            defined: 'BubblegumPayload',
          },
        },
      ],
    },
    {
      name: 'executeSolCnftOrder',
      accounts: [
        {
          name: 'cranker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['market_clock'],
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'treasury',
              },
            ],
          },
        },
        {
          name: 'marketClock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'clock',
              },
            ],
          },
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyOrder',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'NFTValidationV1',
                path: 'nft_validation',
              },
              {
                kind: 'account',
                type: {
                  option: 'publicKey',
                },
                account: 'SOLCompressedNFTOrderV1',
                path: 'buy_order.asset_id',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'u64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'buy_order.price',
              },
              {
                kind: 'account',
                type: 'i64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'buy_order.expiry',
              },
            ],
          },
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
            ],
          },
        },
        {
          name: 'seller',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sellOrder',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'seller',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'NFTValidationV1',
                path: 'nft_validation',
              },
              {
                kind: 'account',
                type: {
                  option: 'publicKey',
                },
                account: 'SOLCompressedNFTOrderV1',
                path: 'sell_order.asset_id',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 1,
              },
              {
                kind: 'account',
                type: 'u64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'sell_order.price',
              },
              {
                kind: 'account',
                type: 'i64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'sell_order.expiry',
              },
            ],
          },
        },
        {
          name: 'sellerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'seller',
              },
            ],
          },
        },
        {
          name: 'assetDelegate',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treeAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'merkleTree',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'compressionProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'bubblegumProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splNoop',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'eventAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: '__event_authority',
              },
            ],
          },
        },
        {
          name: 'program',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bubblegumPayload',
          type: {
            defined: 'BubblegumPayload',
          },
        },
      ],
    },
    {
      name: 'sellIntoCnftBuyOrder',
      accounts: [
        {
          name: 'seller',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
          relations: ['market_clock'],
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'treasury',
              },
            ],
          },
        },
        {
          name: 'marketClock',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'clock',
              },
            ],
          },
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'buyer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'buyOrder',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'NFTValidationV1',
                path: 'nft_validation',
              },
              {
                kind: 'account',
                type: {
                  option: 'publicKey',
                },
                account: 'SOLCompressedNFTOrderV1',
                path: 'buy_order.asset_id',
              },
              {
                kind: 'const',
                type: 'u8',
                value: 0,
              },
              {
                kind: 'account',
                type: 'u64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'buy_order.price',
              },
              {
                kind: 'account',
                type: 'i64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'buy_order.expiry',
              },
            ],
          },
        },
        {
          name: 'buyerEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'buyer',
              },
            ],
          },
        },
        {
          name: 'assetDelegate',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treeAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'merkleTree',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'compressionProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'bubblegumProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splNoop',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'eventAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: '__event_authority',
              },
            ],
          },
        },
        {
          name: 'program',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bubblegumPayload',
          type: {
            defined: 'BubblegumPayload',
          },
        },
      ],
    },
    {
      name: 'cancelSolCnftOrder',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'market',
          isMut: false,
          isSigner: false,
          docs: ['Market instance PDA account.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market.creator',
              },
            ],
          },
        },
        {
          name: 'nftValidation',
          isMut: false,
          isSigner: false,
          relations: ['market'],
        },
        {
          name: 'order',
          isMut: true,
          isSigner: false,
          docs: ['Order state PDA account encoding the order.'],
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'creator',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'NFTValidationV1',
                path: 'nft_validation',
              },
              {
                kind: 'account',
                type: {
                  option: 'publicKey',
                },
                account: 'SOLCompressedNFTOrderV1',
                path: 'order.asset_id',
              },
              {
                kind: 'account',
                type: {
                  defined: 'OrderType',
                },
                account: 'SOLCompressedNFTOrderV1',
                path: 'order.order_type',
              },
              {
                kind: 'account',
                type: 'u64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'order.price',
              },
              {
                kind: 'account',
                type: 'i64',
                account: 'SOLCompressedNFTOrderV1',
                path: 'order.expiry',
              },
            ],
          },
        },
        {
          name: 'creatorEscrowVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'snipermarket',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Market',
                path: 'market',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'creator',
              },
            ],
          },
        },
        {
          name: 'assetDelegate',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'treeAuthority',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'merkleTree',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'compressionProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'bubblegumProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splNoop',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'eventAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: '__event_authority',
              },
            ],
          },
        },
        {
          name: 'program',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'completeLeaf',
          type: {
            option: {
              defined: 'CompleteLeaf',
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'AuthorizedCrankerProof',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'cranker',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'SOLNFTBuyOrderLockV1',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'orderState',
            type: 'publicKey',
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'escrowVaultBump',
            type: 'u8',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'purchaseAmount',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'slot',
            type: 'u64',
          },
          {
            name: 'status',
            type: {
              defined: 'BuyOrderLockStatus',
            },
          },
        ],
      },
    },
    {
      name: 'Market',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'treasury',
            type: 'publicKey',
          },
          {
            name: 'treasuryWithdrawalDestination',
            type: 'publicKey',
          },
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'creator',
            type: 'publicKey',
          },
          {
            name: 'marketClock',
            type: 'publicKey',
          },
          {
            name: 'feeBps',
            type: 'u16',
          },
          {
            name: 'makerRebateBps',
            type: 'u16',
          },
          {
            name: 'locked',
            type: 'bool',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'treasuryBump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'MarketClock',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'orderNonce',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'NFTValidationV1',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'collectionMint',
            type: 'publicKey',
          },
          {
            name: 'status',
            type: {
              defined: 'NFTValidationStatus',
            },
          },
          {
            name: 'creators',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'flags',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'NFTValidationMarker',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'nftValidation',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'SOLNFTSellOrderLockV1',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'orderState',
            type: 'publicKey',
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'escrowVaultBump',
            type: 'u8',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'saleAmount',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'slot',
            type: 'u64',
          },
          {
            name: 'status',
            type: {
              defined: 'SellOrderLockStatus',
            },
          },
          {
            name: 'prefunded',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'SOLCompressedNFTOrderV1',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'creator',
            type: 'publicKey',
          },
          {
            name: 'assetId',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'orderType',
            type: {
              defined: 'OrderType',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'vaultBump',
            type: 'u8',
          },
          {
            name: 'orderValidation',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'nftValidation',
            type: 'publicKey',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'fulfilledSize',
            type: 'u64',
          },
          {
            name: 'expiry',
            type: 'i64',
          },
          {
            name: 'orderNonce',
            type: 'u64',
          },
          {
            name: 'honoredRoyaltyBps',
            type: 'u16',
          },
          {
            name: 'orderLock',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'flags',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'SOLNFTOrderV1',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'nftMint',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'orderType',
            type: {
              defined: 'OrderType',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'vaultBump',
            type: 'u8',
          },
          {
            name: 'nftValidation',
            type: 'publicKey',
          },
          {
            name: 'orderValidation',
            type: 'publicKey',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'fulfilledSize',
            type: 'u64',
          },
          {
            name: 'expireAt',
            type: 'i64',
          },
          {
            name: 'orderNonce',
            type: 'u64',
          },
          {
            name: 'honoredRoyaltyBps',
            type: 'u16',
          },
          {
            name: 'orderLock',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'flags',
            type: 'u32',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'CreateCompressedNFTOrderParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'expiry',
            type: 'i64',
          },
          {
            name: 'honoredRoyaltyBps',
            type: 'u16',
          },
          {
            name: 'typeRaw',
            type: 'u8',
          },
          {
            name: 'orderParamFlags',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'CreateOrderParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'typeRaw',
            type: 'u8',
          },
          {
            name: 'expiry',
            type: 'i64',
          },
          {
            name: 'honoredRoyaltyBps',
            type: 'u16',
          },
          {
            name: 'depositEscrowOverride',
            type: 'bool',
          },
          {
            name: 'postOnly',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'CancelOrderParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'typeRaw',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'GenericOrder',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'honoredRoyaltiesBps',
            type: 'u16',
          },
          {
            name: 'orderType',
            type: {
              defined: 'OrderType',
            },
          },
          {
            name: 'postOnly',
            type: 'bool',
          },
          {
            name: 'vaultBump',
            type: 'u8',
          },
          {
            name: 'orderNonce',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CompleteLeaf',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'dataHash',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'creatorHash',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'nonce',
            type: 'u64',
          },
          {
            name: 'index',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'PreHashedCreatorPayload',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'metadataArgsHash',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'sellerFeeBasisPoints',
            type: 'u16',
          },
          {
            name: 'nonce',
            type: 'u64',
          },
          {
            name: 'index',
            type: 'u32',
          },
          {
            name: 'creators',
            type: {
              defined: 'CreatorPackedBytes',
            },
          },
        ],
      },
    },
    {
      name: 'PreHashedMetadataPayload',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'nonce',
            type: 'u64',
          },
          {
            name: 'index',
            type: 'u32',
          },
          {
            name: 'metadataArgs',
            type: {
              defined: 'PackedMetadataArgs',
            },
          },
        ],
      },
    },
    {
      name: 'PackedUses',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'useMethod',
            type: 'u8',
          },
          {
            name: 'remaining',
            type: 'u64',
          },
          {
            name: 'total',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'PackedCollection',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'verified',
            type: 'bool',
          },
          {
            name: 'key',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'PackedMetadataArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'uri',
            type: {
              defined: 'PackedURL',
            },
          },
          {
            name: 'editionNonce',
            type: {
              option: 'u8',
            },
          },
          {
            name: 'tokenStandard',
            type: {
              option: 'u8',
            },
          },
          {
            name: 'collection',
            type: {
              option: {
                defined: 'PackedCollection',
              },
            },
          },
          {
            name: 'uses',
            type: {
              option: {
                defined: 'PackedUses',
              },
            },
          },
          {
            name: 'tokenProgramVersion',
            type: 'u8',
          },
          {
            name: 'creatorBytes',
            type: {
              defined: 'CreatorPackedBytes',
            },
          },
          {
            name: 'compressedFields',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'BuyOrderLockStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Uninitialized',
          },
          {
            name: 'Initialized',
          },
          {
            name: 'Purchased',
          },
          {
            name: 'Fulfilled',
          },
        ],
      },
    },
    {
      name: 'NFTValidationStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Inactive',
          },
          {
            name: 'Active',
          },
        ],
      },
    },
    {
      name: 'SellOrderLockStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Uninitialized',
          },
          {
            name: 'Initialized',
          },
          {
            name: 'Sold',
          },
          {
            name: 'Fulfilled',
          },
        ],
      },
    },
    {
      name: 'OrderType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Buy',
          },
          {
            name: 'Sell',
          },
        ],
      },
    },
    {
      name: 'BubblegumPayload',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'None',
          },
          {
            name: 'Creator',
            fields: [
              {
                defined: 'PreHashedCreatorPayload',
              },
            ],
          },
          {
            name: 'Metadata',
            fields: [
              {
                defined: 'PreHashedMetadataPayload',
              },
            ],
          },
        ],
      },
    },
    {
      name: 'PackedURL',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Https',
            fields: ['string', 'string'],
          },
          {
            name: 'Http',
            fields: ['string', 'string'],
          },
          {
            name: 'Raw',
            fields: ['string'],
          },
        ],
      },
    },
    {
      name: 'CreatorPackedBytes',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'NoCreators',
          },
          {
            name: 'OneCreators',
            fields: [
              {
                array: ['u8', 1],
              },
            ],
          },
          {
            name: 'TwoCreators',
            fields: [
              {
                array: ['u8', 2],
              },
            ],
          },
          {
            name: 'ThreeCreators',
            fields: [
              {
                array: ['u8', 3],
              },
            ],
          },
          {
            name: 'FourCreators',
            fields: [
              {
                array: ['u8', 4],
              },
            ],
          },
          {
            name: 'FiveCreators',
            fields: [
              {
                array: ['u8', 5],
              },
            ],
          },
        ],
      },
    },
    {
      name: 'TensorswapAuthorizationDataLocal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'payload',
            type: {
              vec: {
                defined: 'TensorswapTaggedPayload',
              },
            },
          },
        ],
      },
    },
    {
      name: 'TensorswapTaggedPayload',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'payload',
            type: {
              defined: 'TensorswapPayloadTypeLocal',
            },
          },
        ],
      },
    },
    {
      name: 'TensorswapPayloadTypeLocal',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Pubkey',
            fields: ['publicKey'],
          },
          {
            name: 'Seeds',
            fields: [
              {
                defined: 'TensorswapSeedsVecLocal',
              },
            ],
          },
          {
            name: 'MerkleProof',
            fields: [
              {
                defined: 'TensorswapProofInfoLocal',
              },
            ],
          },
          {
            name: 'Number',
            fields: ['u64'],
          },
        ],
      },
    },
    {
      name: 'TensorswapSeedsVecLocal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'seeds',
            docs: ['The vector of derivation seeds.'],
            type: {
              vec: 'bytes',
            },
          },
        ],
      },
    },
    {
      name: 'TensorswapProofInfoLocal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'proof',
            docs: ['The merkle proof.'],
            type: {
              vec: {
                array: ['u8', 32],
              },
            },
          },
        ],
      },
    },
    {
      name: 'TensorswapPoolConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'poolType',
            type: {
              defined: 'TensorswapPoolType',
            },
          },
          {
            name: 'curveType',
            type: {
              defined: 'TensorswapCurveType',
            },
          },
          {
            name: 'startingPrice',
            type: 'u64',
          },
          {
            name: 'delta',
            type: 'u64',
          },
          {
            name: 'mmCompoundFees',
            docs: ['Trade pools only'],
            type: 'bool',
          },
          {
            name: 'mmFeeBps',
            type: {
              option: 'u16',
            },
          },
        ],
      },
    },
    {
      name: 'TensorswapPoolType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Token',
          },
          {
            name: 'NFT',
          },
          {
            name: 'Trade',
          },
        ],
      },
    },
    {
      name: 'TensorswapCurveType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Linear',
          },
          {
            name: 'Exponential',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'WithdrawalFromEscrowVaultEvent',
      fields: [
        {
          name: 'withdrawalAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
    {
      name: 'DepositIntoEscrowVaultEvent',
      fields: [
        {
          name: 'depositAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
    {
      name: 'CNFTCreateOrderEventV1',
      fields: [
        {
          name: 'assetId',
          type: {
            option: 'publicKey',
          },
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
    {
      name: 'CNFTCancelOrderEventV1',
      fields: [
        {
          name: 'assetId',
          type: {
            option: 'publicKey',
          },
          index: false,
        },
        {
          name: 'orderType',
          type: 'u8',
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
    {
      name: 'CNFTExecuteOrderEventV1',
      fields: [
        {
          name: 'assetId',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'buyOrderNonce',
          type: 'u64',
          index: false,
        },
        {
          name: 'buyOrderPrice',
          type: 'u64',
          index: false,
        },
        {
          name: 'buyOrderSize',
          type: 'u64',
          index: false,
        },
        {
          name: 'buyOrderFulfilledSize',
          type: 'u64',
          index: false,
        },
        {
          name: 'sellOrderNonce',
          type: 'u64',
          index: false,
        },
        {
          name: 'sellOrderPrice',
          type: 'u64',
          index: false,
        },
        {
          name: 'sellOrderSize',
          type: 'u64',
          index: false,
        },
        {
          name: 'sellOrderFulfilledSize',
          type: 'u64',
          index: false,
        },
        {
          name: 'sellerRecievedAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'sellerFeeBasisPoints',
          type: 'u16',
          index: false,
        },
        {
          name: 'creatorRoyaltiesPaid',
          type: 'u64',
          index: false,
        },
        {
          name: 'makerRebateAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'marketFeesPaid',
          type: 'u64',
          index: false,
        },
        {
          name: 'honoredRoyaltiesBasisPoints',
          type: 'u16',
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
    {
      name: 'ExecuteOrderEventV1',
      fields: [
        {
          name: 'sellerAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'royaltiesAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'makerRebateAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'feesAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'label',
          type: 'string',
          index: true,
        },
      ],
    },
    {
      name: 'CreateOrderEvent',
      fields: [
        {
          name: 'orderNonce',
          type: 'u64',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'PublicKeyMismatch',
      msg: 'PublicKeyMismatch',
    },
    {
      code: 6001,
      name: 'UninitializedAccount',
      msg: 'UninitializedAccount',
    },
    {
      code: 6002,
      name: 'InvalidTokenAccount',
      msg: 'Invalid token account',
    },
    {
      code: 6003,
      name: 'InvalidMintAccount',
      msg: 'Invalid mint account',
    },
    {
      code: 6004,
      name: 'TokenAccountMintMismatch',
      msg: 'Invalid token account mint',
    },
    {
      code: 6005,
      name: 'IncorrectAccountOwner',
      msg: 'IncorrectAccountOwner',
    },
    {
      code: 6006,
      name: 'IncorrectTokenAccountOwner',
      msg: 'IncorrectTokenAccountOwner',
    },
    {
      code: 6007,
      name: 'InvalidTokenOwner',
      msg: 'InvalidTokenOwner',
    },
    {
      code: 6008,
      name: 'NotRentExempt',
      msg: 'NotRentExempt',
    },
    {
      code: 6009,
      name: 'NumericalOverflow',
      msg: 'NumericalOverflow',
    },
    {
      code: 6010,
      name: 'ExpectedSolAccount',
      msg: 'Expected a sol account but got an spl token account instead',
    },
    {
      code: 6011,
      name: 'DerivedKeyInvalid',
      msg: 'Derived key invalid',
    },
    {
      code: 6012,
      name: 'MetadataDoesntExist',
      msg: "Metadata doesn't exist",
    },
    {
      code: 6013,
      name: 'InvalidTokenAmount',
      msg: 'Invalid token amount',
    },
    {
      code: 6014,
      name: 'SellerATACannotHaveDelegate',
      msg: 'Seller ata cannot have a delegate set',
    },
    {
      code: 6015,
      name: 'BuyerATACannotHaveDelegate',
      msg: 'Buyer ata cannot have a delegate set',
    },
    {
      code: 6016,
      name: 'InvalidBasisPoints',
      msg: 'BP must be less than or equal to 10000',
    },
    {
      code: 6017,
      name: 'InvalidBump',
      msg: 'InvalidBump',
    },
    {
      code: 6018,
      name: 'BumpSeedNotInHashMap',
      msg: 'Bump seed not in hash map.',
    },
    {
      code: 6019,
      name: 'InsufficientFunds',
      msg: 'Insufficient funds in escrow vault to purchase.',
    },
    {
      code: 6020,
      name: 'InvalidHonoredBasisPoints',
      msg: 'The sale has set invalid honored basis points.',
    },
    {
      code: 6021,
      name: 'MintFailedValidation',
      msg: 'Mint failed NFT validation',
    },
    {
      code: 6022,
      name: 'OrderExpiryInvalid',
      msg: 'OrderExpiryInvalid',
    },
    {
      code: 6023,
      name: 'OrderExpired',
      msg: 'OrderExpired',
    },
    {
      code: 6024,
      name: 'OrderAlreadyFulfilled',
      msg: 'OrderAlreadyFulfilled',
    },
    {
      code: 6025,
      name: 'InvalidOrderSize',
      msg: 'Invalid order size',
    },
    {
      code: 6026,
      name: 'MarketLocked',
      msg: 'Market locked',
    },
    {
      code: 6027,
      name: 'InactiveNFTValidation',
      msg: 'Inactive NFT validation',
    },
    {
      code: 6028,
      name: 'MissingMint',
      msg: 'Instruction missing mint',
    },
    {
      code: 6029,
      name: 'MissingTokenAccount',
      msg: 'Instruction missing token account',
    },
    {
      code: 6030,
      name: 'UnexpectedMintOrTokenAccount',
      msg: 'Instruction should not have mint or token account',
    },
    {
      code: 6031,
      name: 'InvalidOrderType',
      msg: 'InvalidOrderType',
    },
    {
      code: 6032,
      name: 'OrderMismatch',
      msg: 'Order parameters do not match',
    },
    {
      code: 6033,
      name: 'EmptyNFTValidation',
      msg: 'EmptyNFTValidation',
    },
    {
      code: 6034,
      name: 'InvalidAuthority',
      msg: 'InvalidAuthority',
    },
    {
      code: 6035,
      name: 'InvalidMarket',
      msg: 'InvalidMarket',
    },
    {
      code: 6036,
      name: 'InvalidTreasury',
      msg: 'InvalidTreasury',
    },
    {
      code: 6037,
      name: 'InvalidTreasuryWithdrawalDestination',
      msg: 'InvalidTreasuryWithdrawalDestination',
    },
    {
      code: 6038,
      name: 'InvalidMarketClock',
      msg: 'InvalidMarketClock',
    },
    {
      code: 6039,
      name: 'EscrowBalanceZero',
      msg: 'EscrowBalanceZero',
    },
    {
      code: 6040,
      name: 'WithdrawalAmountZero',
      msg: 'WithdrawalAmountZero',
    },
    {
      code: 6041,
      name: 'TooManyCreators',
      msg: 'TooManyCreators',
    },
    {
      code: 6042,
      name: 'ValidationAlreadyHasCollectionMint',
      msg: 'ValidationAlreadyHasCollectionMint',
    },
    {
      code: 6043,
      name: 'AlreadyInitialized',
      msg: 'AlreadyInitialized',
    },
    {
      code: 6044,
      name: 'OrderLocked',
      msg: 'OrderLocked',
    },
    {
      code: 6045,
      name: 'OrderNotLocked',
      msg: 'OrderNotLocked',
    },
    {
      code: 6046,
      name: 'InvalidOrder',
      msg: 'InvalidOrder',
    },
    {
      code: 6047,
      name: 'OrderLockExpired',
      msg: 'OrderLockExpired',
    },
    {
      code: 6048,
      name: 'OrderLockAlreadyPurchased',
      msg: 'OrderAlreadyPurchasd',
    },
    {
      code: 6049,
      name: 'OrderLockAlreadyInitialized',
      msg: 'OrderLockAlreadyInitialized',
    },
    {
      code: 6050,
      name: 'OrderLockAlreadyFulfilled',
      msg: 'OrderAlreadyFulfilled',
    },
    {
      code: 6051,
      name: 'OrderLockNotInitialized',
      msg: 'OrderLockNotInitialized',
    },
    {
      code: 6052,
      name: 'OrderLockNotPurchased',
      msg: 'OrderLockNotPurchased',
    },
    {
      code: 6053,
      name: 'UnauthorizedCranker',
      msg: 'UnauthorizedCranker',
    },
    {
      code: 6054,
      name: 'MissingAccount',
      msg: 'Missing Account',
    },
    {
      code: 6055,
      name: 'CorruptFlag',
      msg: 'CorruptFlag',
    },
    {
      code: 6056,
      name: 'FlagNotSet',
      msg: 'FlagNotSet',
    },
    {
      code: 6057,
      name: 'OrderPostOnly',
      msg: 'Order post only',
    },
    {
      code: 6058,
      name: 'InvalidEdition',
      msg: 'InvalidEdition',
    },
    {
      code: 6059,
      name: 'StaleSellOrder',
      msg: 'StaleSellOrder',
    },
    {
      code: 6060,
      name: 'CannotSelfTrade',
      msg: 'CannotSelfTrade',
    },
    {
      code: 6061,
      name: 'PaidTooMuch',
      msg: 'PaidTooMuch',
    },
    {
      code: 6062,
      name: 'ActiveNFTValidation',
      msg: 'ActiveNFTValidation',
    },
    {
      code: 6063,
      name: 'TokenRecordLocked',
      msg: 'TokenRecordLocked',
    },
    {
      code: 6064,
      name: 'TokenRecordDelegated',
      msg: 'TokenRecordDelegated',
    },
    {
      code: 6065,
      name: 'OrderLockAlreadySold',
      msg: 'OrderLockAlreadySold',
    },
    {
      code: 6066,
      name: 'SoldTooCheap',
      msg: 'SoldTooCheap',
    },
    {
      code: 6067,
      name: 'FailedDeserialization',
      msg: 'FailedDeserialization',
    },
    {
      code: 6068,
      name: 'MissingTokenRecord',
      msg: 'MissingTokenRecord',
    },
    {
      code: 6069,
      name: 'MissingParams',
      msg: 'MissingParams',
    },
    {
      code: 6070,
      name: 'InvalidParams',
      msg: 'InvalidParams',
    },
    {
      code: 6071,
      name: 'InvalidHash',
      msg: 'InvalidHash',
    },
    {
      code: 6072,
      name: 'ExpectedPartialVerification',
      msg: 'ExpectedPartialVerification',
    },
    {
      code: 6073,
      name: 'CannotPlaceCollectionBid',
      msg: 'CannotPlaceCollectionBid',
    },
  ],
};

export const BORSH_CODER = new BorshCoder(IDL);
