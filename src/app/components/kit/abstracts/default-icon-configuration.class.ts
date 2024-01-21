import { IconConfiguration } from "../interfaces/icon-configuration";

export abstract class DefaultIconConfiguration implements IconConfiguration {
    trashIcon = 'default-trash-icon-class';
    penIcon = 'default-pen-icon-class';
}