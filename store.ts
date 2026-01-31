
import { Bounty, BountyStatus, Shark, UserProfile } from './types';

export const INITIAL_BOUNTIES: Bounty[] = [
  {
    id: '1',
    project: 'NEON_PROTOCOL',
    title: 'Database Optimization for Real-time Mesh',
    value: 4500,
    endsIn: '02h 14m 55s',
    status: BountyStatus.HOT,
    tags: ['PostgreSQL', 'Rust'],
    difficulty: 'HARD',
    description: 'Our real-time mesh networking protocol is experiencing 200ms lag during peak throughput. We suspect the indexing on the temporal tables is causing a massive write-amplification issue.',
    requirements: [
      'Refactor the temporal GIST indexes to use a more efficient BRIN approach.',
      'Implement a write-ahead buffer for incoming node heartbeat signals.',
      'Reduce p99 latency to sub-50ms.',
      'Verify zero data loss during high-concurrency stress tests.'
    ]
  },
  {
    id: '2',
    project: 'ZENITH_CORE',
    title: 'Implement Post-Quantum Encryption Layer',
    value: 12000,
    endsIn: '4 Days',
    status: BountyStatus.ELITE,
    tags: ['Security', 'Go'],
    difficulty: 'CRITICAL',
    description: 'The Board of Directors has ordered an immediate upgrade to Kyber-768 for all inter-service communication. Standard TLS 1.3 is no longer sufficient for our classified data streams.',
    requirements: [
      'Integrate the liboqs-go wrapper into the existing transport layer.',
      'Ensure backwards compatibility for legacy nodes during the transition window.',
      'Implement a fail-safe kill-switch if quantum entropy drops below 0.8.',
      'Document the key rotation ceremony protocol.'
    ]
  },
  {
    id: '3',
    project: 'FLUX_AI',
    title: 'Neural Map Rendering Bug (Canvas Context)',
    value: 850,
    endsIn: '18 Hours',
    status: BountyStatus.AVAILABLE,
    tags: ['TypeScript', 'Canvas'],
    difficulty: 'MEDIUM',
    description: 'The AI-generated map tiles are flickering when the user zooms past level 14. It seems to be a collision between the WebGL context and the 2D overlay layer.',
    requirements: [
      'Isolate the canvas context switching logic.',
      'Optimize the coordinate translation matrix for high-zoom levels.',
      'Fix the z-index fighting between the neural nodes and the base terrain.',
      'Implement a simple cache for rendered tiles to prevent re-computation.'
    ]
  },
  {
    id: '4',
    project: 'HYPER_LEDGER',
    title: 'Smart Contract Audit: Liquidity Pool A',
    value: 3200,
    endsIn: '12 Hours',
    status: BountyStatus.AVAILABLE,
    tags: ['Solidity', 'Audit'],
    difficulty: 'HARD',
    description: 'We need a set of fresh eyes on our new re-entrancy protection logic for the Automated Market Maker (AMM). We cannot afford another Flash Loan attack.',
    requirements: [
      'Identify potential re-entrancy vectors in the swap function.',
      'Check for integer overflow/underflow in the liquidity calculation logic.',
      'Verify the gas consumption is optimized for L1 deployment.',
      'Propose a fix for any identified vulnerabilities.'
    ]
  },
  {
    id: '5',
    project: 'GHOST_SHELL',
    title: 'Zero-Day Vulnerability Patch (Emergency)',
    value: 7800,
    endsIn: '45m 12s',
    status: BountyStatus.URGENT,
    tags: ['Security', 'C++'],
    difficulty: 'CRITICAL',
    description: 'An exploit has been detected in the wild targeting our buffer handling in the core RPC module. Patch is required immediately before the Asian markets open.',
    requirements: [
      'Trace the stack overflow in the handle_request() method.',
      'Replace all unsafe strcpy calls with strncpy or similar bounded alternatives.',
      'Deploy the patch to the canary environment within 30 minutes.',
      'Prepare a post-mortem report for the security council.'
    ]
  },
  {
    id: '6',
    project: 'DATA_FLOW',
    title: 'Refactor Data Pipeline for ETL 2.0',
    value: 1900,
    endsIn: '2 Days',
    status: BountyStatus.AVAILABLE,
    tags: ['Python', 'AWS'],
    difficulty: 'MEDIUM',
    description: 'Our legacy airflow DAGs are becoming unmanageable. We need to migrate the core extraction logic to a more modular, testable framework using PySpark.',
    requirements: [
      'Deconstruct the monolithic extraction script into functional modules.',
      'Write unit tests for the data transformation logic.',
      'Set up a staging environment on AWS EMR.',
      'Bench-mark the new pipeline against the legacy execution time.'
    ]
  }
];

export const INITIAL_SHARKS: Shark[] = [
  { id: '1', name: 'LIQUIDATOR_X', earned: 1200000, rank: 1, avatar: 'https://picsum.photos/seed/shark1/100/100' },
  { id: '2', name: 'CODE_PREDATOR', earned: 842000, rank: 2, avatar: 'https://picsum.photos/seed/shark2/100/100' },
  { id: '3', name: 'ZERO_DAY', earned: 610000, rank: 3, avatar: 'https://picsum.photos/seed/shark3/100/100' }
];

export const INITIAL_USER: UserProfile = {
  username: 'APEX_DEV',
  netWorth: 42500,
  level: 42,
  inventory: ['Bounty Radar', 'Task Shield']
};
