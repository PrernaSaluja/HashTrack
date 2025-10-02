const { expect } = require("chai");

describe("Project contract", function () {
    let project, owner; 

    beforeEach(async () => {
        const Project = await ethers.getContractFactory("Project");
        [owner] = await ethers.getSigners();
        project = await Project.deploy(); 
    });

    it("Should upload and retrieve a file", async function () {
        await project.uploadFile("QmHash123", "file.txt");

        const files = await project.getMyFiles();
        expect(files.length).to.equal(1);
        expect(files[0].fileHash).to.equal("QmHash123");
    });
});

