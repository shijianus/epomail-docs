import { spawnSync } from 'node:child_process';

// Run a Python validation script with the interpreter available on this host.
// Linux CI conventionally exposes python3; Windows installs usually expose
// python. Trying both keeps `pnpm validate` reproducible on either platform.
const [script, ...args] = process.argv.slice(2);
if (!script) {
	console.error('Usage: node scripts/py.mjs <script.py> [...args]');
	process.exit(2);
}

const candidates = process.platform === 'win32'
	? ['python', 'py', 'python3']
	: ['python3', 'python'];

for (const command of candidates) {
	const result = spawnSync(command, [script, ...args], { stdio: 'inherit' });
	if (result.error?.code === 'ENOENT') continue;
	if (result.error) {
		console.error(result.error.message);
		process.exit(1);
	}
	process.exit(result.status ?? 1);
}

console.error(`No Python interpreter found (tried: ${candidates.join(', ')})`);
process.exit(1);
