import SideBar from "@/components/partials/SideBar";
import {
  AccessTimeContainer,
  BenefitsContainer,
  ImageAndTextContainer,
  ImageAndTextContainerAlert,
  InputAndLabel,
  InputAndLabelAndPriceContainer,
  LeafletsContainer,
  MySignatureContainer,
  PaymentCollectionContainer,
  PaymentRedirectButton,
  SignaturesAndLeafletsContainer,
  SignaturesCardContainer,
  SignaturesContainer,
  TitleAndContent,
} from "./styles";

import { IoMdCheckmark } from "react-icons/io";
import { LiaCreditCard } from "react-icons/lia";
import Image from "next/image";

import personImage from "@image/person_image.svg";
import lightBulb from "@image/light_bulb_image.svg";
import papersImage from "@image/papers_image.svg";
import bookImage from "@image/book_image.svg";
import alertImage from "@image/alert_image.svg";

export default function MySignatures() {
  return (
    <MySignatureContainer>
      <SideBar />
      <TitleAndContent>
        <h1>Assinaturas</h1>

        <SignaturesAndLeafletsContainer>
          <SignaturesContainer>
            <SignaturesCardContainer>
              <InputAndLabelAndPriceContainer>
                <InputAndLabel>
                  <input type="radio" name="plan" id="free-plan" value="free" />
                  <label htmlFor="free-plan">Gratuito</label>
                </InputAndLabel>

                <p>R$ 0</p>
              </InputAndLabelAndPriceContainer>
              <BenefitsContainer>
                <AccessTimeContainer>
                  <IoMdCheckmark />
                  <p>Acesso completo por 7 dias</p>
                </AccessTimeContainer>
                <PaymentCollectionContainer>
                  <LiaCreditCard />
                  Totalmente gratuito
                </PaymentCollectionContainer>
              </BenefitsContainer>
            </SignaturesCardContainer>
            <PaymentRedirectButton>Ir para o pagamento</PaymentRedirectButton>
          </SignaturesContainer>
          <LeafletsContainer>
            <p>Turbine seu aprendizado</p>
            <h2>Simplifique seus estudos com nossos recursos!</h2>

            <ImageAndTextContainer>
              <Image alt="person image" src={personImage} />
              <p>
                Acesse <span>questões ilimitadas </span>e sempre atualizadas
                para prática constante
              </p>
            </ImageAndTextContainer>

            <ImageAndTextContainer>
              <Image alt="person image" src={lightBulb} />
              <p>
                Receba <span> sugestões de temas para revisão </span> com base
                nos seus resultados
              </p>
            </ImageAndTextContainer>

            <ImageAndTextContainer>
              <Image alt="person image" src={papersImage} />
              <p>
                Simule <span>vestibulares reais </span>com correção no final
              </p>
            </ImageAndTextContainer>
            <ImageAndTextContainer>
              <Image alt="person image" src={bookImage} />
              <p>
                Aprenda enquanto pratica com{" "}
                <span>comentários explicativos</span>{" "}
              </p>
            </ImageAndTextContainer>
            <ImageAndTextContainerAlert>
              <Image alt="person image" src={alertImage} />
              <p>
                Nosso prazo de reembolso é de <span>7 dias corridos</span>
              </p>
            </ImageAndTextContainerAlert>
          </LeafletsContainer>
        </SignaturesAndLeafletsContainer>
      </TitleAndContent>
    </MySignatureContainer>
  );
}
