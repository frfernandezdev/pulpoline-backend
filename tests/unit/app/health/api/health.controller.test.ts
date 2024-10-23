import { Logger } from "@nestjs/common";

import { createMock, Mock } from "@/tests/utils/mock";

import { ApiHealthController } from "@/src/apps/api/health/controllers/health.controller";

describe("HealthController", () => {
  let healthController: ApiHealthController;
  let logger: Mock<Logger>;

  beforeEach(() => {
    logger = createMock<Logger>();
    healthController = new ApiHealthController(logger);
  });

  describe("run", () => {
    it("should return is healthy", () => {
      expect(healthController.handle()).toEqual({ status: "ok" });
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
