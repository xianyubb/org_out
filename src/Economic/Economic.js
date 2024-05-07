"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceMoney = exports.addmoney = void 0;
const config_1 = require("../Config/config");
const signal_1 = require("../i18n/signal");
// let Score: Objective = null;
// if (Conf.Economy === "Score") {
//     Score = mc.getScoreObjective(Conf.Score);
// }
/**
 * 增加玩家存款
 * @param player 要增加的玩家
 * @param amount
 */
function addmoney(player, amount) {
    if (amount === 0)
        return true;
    if (config_1.Conf.Economy === "Score") {
        try {
            const name = config_1.Conf.Score;
            if (mc.runcmdEx(`scoreboard players add "${player.name}" "${name}" ${amount}`).success) {
                player.tell((0, signal_1.XYMessage)("AddMoneySuccess", config_1.Conf.language, amount));
                return true;
            }
            player.tell((0, signal_1.XYMessage)("AddMoneyFailure", config_1.Conf.language));
            return false;
        }
        catch (e) {
            logger.error(e);
            player.tell((0, signal_1.XYMessage)("AddMoneyFailure", config_1.Conf.language));
        }
        return false;
    }
    if (config_1.Conf.Economy === "LLmoney") {
        if (money.add(player.xuid, amount)) {
            player.tell((0, signal_1.XYMessage)("AddMoneySuccess", config_1.Conf.language, amount));
            return true;
        }
        player.tell((0, signal_1.XYMessage)("AddMoneyFailure", config_1.Conf.language));
        return false;
    }
    logger.error((0, signal_1.XYMessage)("EconomicTypeCouldNotBeFound", config_1.Conf.language));
    return false;
}
exports.addmoney = addmoney;
/**
 * 减少玩家存款
 * @param player
 * @param amount
 */
function reduceMoney(player, amount) {
    if (amount === 0)
        return true;
    if (config_1.Conf.Economy === "Score") {
        const name = config_1.Conf.Score;
        try {
            if (mc.runcmdEx(`scoreboard players remove "${player.name}" "${name}" ${amount}`).success) {
                player.tell((0, signal_1.XYMessage)("ReduceMoneySuccess", config_1.Conf.language, amount));
                return true;
            }
            player.tell((0, signal_1.XYMessage)("ReduceMoneyFailure", config_1.Conf.language));
            return false;
        }
        catch (e) {
            logger.error(e);
            player.tell((0, signal_1.XYMessage)("ReduceMoneyFailure", config_1.Conf.language));
        }
        return false;
    }
    if (config_1.Conf.Economy === "LLmoney") {
        if (money.reduce(player.xuid, amount)) {
            player.tell((0, signal_1.XYMessage)("ReduceMoneySuccess", config_1.Conf.language, amount));
            return true;
        }
        player.tell((0, signal_1.XYMessage)("ReduceMoneyFailure", config_1.Conf.language));
        return false;
    }
    logger.error((0, signal_1.XYMessage)("EconomicTypeCouldNotBeFound", config_1.Conf.language));
    return false;
}
exports.reduceMoney = reduceMoney;
