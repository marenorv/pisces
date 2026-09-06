import {useQuery} from "@tanstack/react-query";
import * as api from "@api";
import {LANGUAGE_LABEL} from "@constants/language.ts";
import type {SelectOptions} from "@type/options.ts";

export const useOptions = () => {
    const {data: locations = []} = useQuery({
        queryKey: ["options", "locations"],
        queryFn: api.getLocationsOpts,
    });

    const {data: fishes = []} = useQuery({
        queryKey: ["options", "fishes"],
        queryFn: api.getFishesOpts,
    });

    const {data: organizations = []} = useQuery({
        queryKey: ["options", "organizations"],
        queryFn: api.getOrganizationsOpts,
    });

    const locationsOpts: SelectOptions[] = locations.map((location) => ({
        value: location.id,
        label: location[LANGUAGE_LABEL],
    }));

    const fishesOpts: SelectOptions[] = fishes.map((fish) => ({
        value: fish.id,
        label: fish[LANGUAGE_LABEL],
    }));

    const organizationsOpts: SelectOptions[] = organizations.map((organization) => ({
        value: organization.id,
        label: organization.name,
    }));

    return {
        locationsOpts,
        fishesOpts,
        organizationsOpts
    }
}
