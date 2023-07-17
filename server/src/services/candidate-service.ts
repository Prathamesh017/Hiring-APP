import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { CandidateType } from '../types/type';
import jwt from "jsonwebtoken";


const prisma = new PrismaClient()

class CandidateService {
  public async getAllCandidates() {
    const candidate = await prisma.candidate.findMany({
    })
    return candidate






  }

  public async registerCandidate(name: string, email: string, password: string): Promise<CandidateType> {

    if (!(name && email && password)) {
      throw new Error("Incomplete Data");
    }
    const existingCandidate = await prisma.candidate.findUnique({
      where: {
        email,
      },
    })

    if ((existingCandidate)) {
      throw new Error("User Already Exist");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);


    const candidate = await prisma.candidate.create({
      data: { name, email, password: hashedPassword },
    })

    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      token: this.generateToken(candidate.id)

    }






  }
  public async loginCandidate(email: string, password: string): Promise<CandidateType> {

    if (!(email && password)) {
      throw new Error("Incomplete Data");
    }
    const candidate = await prisma.candidate.findUnique({
      where: {
        email,
      },
    })
    if ((!candidate)) {
      throw new Error("User Doesn't Exist");
    }

    if (!(await bcrypt.compare(password, candidate.password))) {
      throw new Error("Invalid Creditinals");
    }



    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      token: this.generateToken(candidate.id)

    }






  }
  public generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }
}


export default CandidateService;