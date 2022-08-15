import type { EntityId } from "@reduxjs/toolkit";
import ResourceState from "../../../components/resource-state";
import type { LoadableResource } from "../../../redux/types";
import type { PokemonInfo } from "../types";
import { usePokemonInfo } from "./hooks";
import TypePill from "../../../components/pokemon-type-pill";
import "./style.scss";

export default function PokemonCard(props: { pokemonName: EntityId }) {
  const pokemonInfo = usePokemonInfo(props.pokemonName);

  return <PokemonCardData info={pokemonInfo} {...props} />;
}

export function PokemonCardData(props: {
  pokemonName: EntityId;
  info: LoadableResource<PokemonInfo> | undefined;
}) {
  return (
    <section className="pokemon-card" data-testid="card">
      <svg viewBox="0 0 50 50"/>
      <div className="pokemon-card__plus">
        +
      </div>
      <div className="pokemon-card__name">
        {props.pokemonName}
      </div>
      <div className="pokemon-card__status">
        <ResourceState state={props.info} />
      </div>
      <PokemonImage
        images={props.info?.data?.sprites}
        alt={props.pokemonName as string}
      />
      <div className="pokemon-card__types">
        {props.info?.data?.types?.map((t) => (
          <TypePill pokemonType={t.type.name} key={t.type.name} />
        ))}
      </div>
      <div
        className="pokemon-card__background"
      ></div>
    </section>
  );
}

function PokemonImage({
  images,
  alt,
}: {
  images: PokemonInfo["sprites"] | undefined;
  alt: string;
}) {
  const imageSrc = images?.other["official-artwork"].front_default;
  return imageSrc ? (
    <img
      src={imageSrc}
      alt={alt}
      data-testid="pokemon-image"
      className="pokemon-card__image"
    />
  ) : null;
}
