// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, dnaArray) => {
  return {
    _specimen: num,
    dna: dnaArray,
    mutate() {
      const randomStrand = Math.floor(Math.random() * 15);
      let newStrand = returnRandBase();
      console.log("New Strand : " + newStrand);
      while (newStrand === this.dna[randomStrand]) {
        newStrand = returnRandBase();
      }
      this.dna[randomStrand] = newStrand;
      return this.dna;
    },
    compareDna(pAequorObj) {
      let dnaMatchCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequorObj.dna[i]) {
          dnaMatchCount++;
        }
      }
      console.log(dnaMatchCount);
      dnaMatchPercentage = Math.round((dnaMatchCount / this.dna.length) * 100);
      console.log(
        `specimen ${this._specimen} and ${pAequorObj._specimen} have ${dnaMatchPercentage}% in common.`
      );
    },
    willLikelySurvive() {
      const survivingDnaCount = this.dna.filter(
        (element) => element === "C" || element === "G"
      ).length;
      const survivingChance = Math.round((survivingDnaCount / 15) * 100);
      if (survivingChance >= 60) {
        return true;
      }
      return false;
    },
  };
};

const pAequorArr = [];
let pAequorCount = 1;
while (pAequorCount <= 30) {
  let pAequor = pAequorFactory(pAequorCount, mockUpStrand());
  if (pAequor.willLikelySurvive) {
    pAequorArr.push(pAequor);
    pAequorCount++;
  }
}

console.log(pAequorArr);
