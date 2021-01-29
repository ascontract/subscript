import { main } from "./cli";
/**
 * cdt is just a wrapper of asc for smart contract development
 */
main(process.argv.slice(2), {}, (err) => {
  if (err) {
    throw err;
  }
  return 1
})